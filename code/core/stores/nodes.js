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
            node.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        }

        if(node.parent === undefined && node.id !== 'root') {
            node.parent = 'root';
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
        if(id === 'root') {
            return;
        }

        if(this.hasProperty(id)) {

            var node   = this.get(id);
            var parent = this.get(node.parent);

            if(_.isArray(node.children)) {
                _.each(node.children, function(child, index) {
                    this.deleteNode(child);
                }.bind(this));
            }

            this.getStore(parent.id).set('children', _.without(parent.children, id)).trigger();
            this.remove(node.id);
        }  
    },

    addChildNode: function(properties, position) {
        var parent = this.get(properties.parent) || this.get('root');

        if(parent) {
            var child = this.addNode(properties);

            if(position === 'first') {
                parent.children.unshift(child);
            }else{
                parent.children.push(child);
            }

            return child;
        }

        throw new Error('Parent does not exist');
    },

    moveNodeBesideSibling: function(id, sibling, position) {
        if(this.hasProperty(id) && this.hasProperty(sibling) && id !== sibling) {
            var node   = _.clone(this.get(id));
            var parent = this.getStore(node.parent);
            
            // Non-recursive removal from parent
            parent.set('children', _.without(parent.get('children'), id));
            parent.trigger();

            // Non-recursive removal of node            
            this.remove(id);

            this.insertNodeBesideSibling(node, sibling, position);
        }
    },

    insertNodeBesideSibling: function(node, sibling, position) {
        var children = [];
        var sibling  = this.get(sibling);
        var parent   = this.get(sibling.parent);
        var node     = _.isString(node) ? this.get(node) : this.get(this.addNode(node));

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

        this.updateNode(parent.id, 'children', children);

        this.getStore(parent.id).trigger();
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

    onUpdateNode: function(id, properties, nested_properties) {
        this.updateNode(id, properties, nested_properties);
        this.getStore(id).trigger(id);
    },

    onUpdateColumns: function(id, value) {
        this.getStore(id).set('columns', value).trigger(id, value);
    },

    onUpdateColspan: function(id, value, device) {
        this.getStore(id).getStore('colspan').set(device, value);
        this.getStore(id).trigger(id, value, device);
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