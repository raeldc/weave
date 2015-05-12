var Store         = require('core/stores'),
    NodeDefaults  = require('core/components/node').defaults || {},
    Components    = require('core/stores/components.js'),
    UINodeActions = require('core/actions/node.js');

module.exports = new Store({}, UINodeActions, {
    setData: function(data) {
        if(_.isObject(data) && !_.isEmpty(data)) {
            _.each(data, function(node, index){
                node.id = index;
                this.addNode(node);
            }.bind(this));
        }

        return this;
    },

    getDefaults: function(component) {
        var defaults = Components.getDefaults(component) || {};

        return _.deepExtend(_.deepClone(NodeDefaults), _.deepClone(defaults));
    },

    addNode: function(properties) {
        var parent,
            node = _.isObject(properties) ? _.clone(properties) : {};

        if(node.id === undefined) {
            node.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36) + '-' + node.component;
        }

        node = _.deepExtend(this.getDefaults(node.component), node);

        this.set(node.id, node);

        return node.id;
    },

    updateNode: function(id, properties, nested_properties) {
        var node = this.getStore(id);
        if(node){
            if(_.isString(properties)) {
                node.set(properties, _.extend(node.getObject(properties) || {}, nested_properties));
            }else if(_.isObject(properties)) {
                this.set(id, _.extend(node.toObject(), properties));
            }

            return id;
        }

        throw new Error('Error in updating node');
    },

    deleteNode: function(id) {
        var node, parent;

        if(id === 'root') {
            return;
        }

        if(this.hasProperty(id)) {
            node = this.get(id);

            // Delete the Children of the node
            if(_.isArray(node.children)) {
                _.each(node.children, function(child, index) {
                    this.deleteNode(child);
                }.bind(this));
            }

            // Remove this node from its parent
            if(node.parent) {
                parent = this.get(node.parent);
                this.getStore(parent.id).set('children', _.without(parent.children, id)).trigger();
            }

            // Remove this node
            this.remove(node.id);
        }  
    },

    addChildNode: function(properties, position) {
        var children, node, 
            parent = this.get(properties.parent);

        if(parent) {
            node     = this.addNode(properties);
            children = _.clone(parent.children);

            if(position === 'first') {
                children.unshift(node);
            }else{
                children.push(node);
            }

            this.getStore(parent.id).set('children', children);

            return node;
        }

        throw new Error('Parent does not exist');
    },

    onMoveNodeToParent: function(node, parent) {
        var previous;

        if(this.hasProperty(node) && this.hasProperty(parent)) {
            node     = this.get(node);
            previous = this.getStore(node.parent);

            previous.set('children', _.without(previous.get('children'), node.id));
            previous.trigger();

            node.parent = parent;

            this.remove(node.id);

            this.addChildNode(node, 'after');
            this.getStore(parent).trigger();
        }
    },

    moveNodeBesideSibling: function(id, sibling, position) {
        var node, parent;

        if(this.hasProperty(id) && this.hasProperty(sibling) && id !== sibling) {
            node = _.clone(this.get(id));

            // Non-recursive removal of node            
            this.remove(id);

            if(node.parent) {
                parent = this.getStore(node.parent);
                // Non-recursive removal from parent
                parent.set('children', _.without(parent.get('children'), id));

                // We only trigger the parent if we're moving to a different parent
                // else we let this.insertNodeBesideSibling trigger the parent
                if(node.parent !== this.get(sibling).parent) {
                    parent.trigger();
                }
            }

            this.insertNodeBesideSibling(node, sibling, position);
        }
    },

    insertNodeBesideSibling: function(node, sibling, position) {
        var children = [];
            sibling  = this.get(sibling),
            parent   = this.get(sibling.parent),
            node     = _.isString(node) ? this.get(node) : this.get(this.addNode(node));

        if(sibling === undefined) {
            throw new Error('Sibling does not exist');
        }

        this.getStore(node.id).set('parent', parent.id);

        if(_.size(parent.children) > 0){
            _.each(parent.children || [], function(child, index){
                if(child === sibling.id) {
                    if(position === 'before') {
                        children.push(node.id);
                        if(child !== node.id) children.push(child);
                    }else { 
                        if(child !== node.id) children.push(child);
                        children.push(node.id);
                    }
                }else if(child !== node.id) {
                    children.push(child);
                }
            });
        }else {
            children.push(node.id);
        }

        this.getStore(parent.id).set('children', children).trigger();
        this.getStore(node.id).trigger();
    },

    onInsertNodeBesideSibling: function(node, sibling, position) {
        this.insertNodeBesideSibling(node, sibling, position);
    },

    onInsertNodeAfterSibling: function(node, sibling) {
        this.insertNodeBesideSibling(node, sibling, 'after');
    },

    onInsertNodeBeforeSibling: function(node, sibling) {
        this.insertNodeBesideSibling(node, sibling, 'before');
    },

    onAddNode: function(properties) {
        var id = this.addNode(properties);
        this.getStore(id).trigger(id);
    },

    onAddChildNode: function(parent, properties) {
        properties.parent = parent;
        this.addChildNode(properties);
        this.getStore(parent).trigger(parent);
    },

    onAddColumn: function(row) {
        var defaults = Components.getDefaults('column');
        row          = this.get(row);

        this.addChildNode({
            component: 'column',
            parent   : row.id,
            colspan  : {
                desktop: defaults.colspan.desktop > row.columns ? row.columns : defaults.colspan.desktop,
                laptop : defaults.colspan.laptop  > row.columns ? row.columns : defaults.colspan.laptop,
                tablet : defaults.colspan.tablet  > row.columns ? row.columns : defaults.colspan.tablet,
                phone  : defaults.colspan.phone   > row.columns ? row.columns : defaults.colspan.phone
            }
        });

        this.getStore(row.id).trigger();
    },

    onUpdateNode: function(id, properties, nested_properties) {
        this.updateNode(id, properties, nested_properties);
        this.getStore(id).trigger(id);
    },

    onUpdateColumns: function(id, columns) {
        var row      = this.getStore(id);
            children = row.get('children');

        if(row.get('columns') !== columns) {
            // All Children that has value more than the new value should be updated
            _.each(children, function(column){
                var colspan;
                    column = this.getStore(column);

                colspan = column.get('colspan');

                _.each(colspan, function(value, device){
                    if(value > columns) {
                        column.getStore('colspan').set(device, columns);
                    }
                }.bind(this));
            }.bind(this));

            row.set('columns', columns).trigger(id, columns);
        }
    },

    onUpdateColspan: function(id, value, device) {
        var column  = this.getStore(id),
            row     = this.getStore(column.get('parent')),
            colspan = value > row.get('columns') ? row.get('columns') : value;

        column.getStore('colspan').set(device, colspan);
        column.trigger(id, value, device);
    },

    onDeleteNode: function(id) {
        this.deleteNode(id);
    },

    onUpdateNodeCSS: function(id, device, property, value) {
        this.getStore(id).getStore('css').getStore(device).set(property, value);
        this.getStore(id).getStore('css').trigger(property, value);
    },

    onUpdateText: function(id, text) {
        this.getStore(id).set('text', text).trigger(id, text);
    }
});