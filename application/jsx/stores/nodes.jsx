var Store         = require('application/stores'),
    UINodeActions = require('application/actions/node.js');



function addNodeAsFirstChild(parent, node) {
    node.parent = parent;
    return addChildNode(node, 'first');
}

function addNodeAsLastChild(parent, node) {
    node.parent = parent;
    return addChildNode(node, 'last');
}

function insertNodeBesideSibling(node, sibling, position) {
    var children   = [];
    var sibling    = findNode(sibling);
    var parent     = findNode(sibling.parent);
    var node       = _.isString(node) ? findNode(node) || addNode() : addNode(node);

    if(sibling === undefined) {
        throw new Error('Sibling does not exist');
    }

    node.parent = parent.id;

    if(_.size(parent.children) > 0){
        _.each(parent.children || [], function(value, index){
            if(value === sibling.id) {
                if(position === 'before') {
                    children.push(node.id);
                    if(value !== node.id) children.push(value);
                }else {
                    if(value !== node.id) children.push(value);
                    children.push(node.id);
                }
            }else if(value !== node.id) {
                children.push(value);
            }
        });
    }else {
        children.push(node.id);
    }

    updateNode(parent.id, {children: children});
}

function insertNodeBeforeSibling(node, sibling) {
    insertNodeBesideSibling(node, sibling, 'before');
}

function insertNodeAfterSibling(node, sibling) {
    insertNodeBesideSibling(node, sibling, 'after');
}

function deleteNode(id) {
    if(id === 'root') {
        return;
    }

    var node    = findNode(id);
    var parent  = findNode(node.parent);

    if(_.isArray(node.children)) {
        _.each(node.children, function(child, index) {
            deleteNode(child);
        });
    }

    updateNode(parent.id, {children: _.without(parent.children, id)});

    delete _nodes[id];
}

module.exports = new Store(require('application/demodata.js'), UINodeActions, {
    addNode: function(properties) {
        var parent,
            node = _.isObject(properties) ? _.clone(properties) : {};

        if(node.id === undefined) {
            node.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        }

        if(node.parent === undefined) {
            node.parent = 'root';
        }

        if(!_.isArray(node.children)) {
            node.children = [];
        }

        this.set(node.id, node);

        return node.id;
    },

    updateNode: function(id, properties, nested_properties) {
        var node = this.get(id);
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

    onAddNode: function(properties) {
        var id = this.addNode(properties);
        this.getStore(id).trigger(id);
    },

    onAddChildNode: function(parent, properties, position) {
        properties.parent = parent;
        this.addChildNode(properties);
        this.getStore(parent).trigger();
    },

    onUpdateNode: function(id, properties, nested_properties) {
        this.updateNode(id, properties, nested_properties);
        this.getStore(id).trigger(id);
    }
});