var Store = require('application/stores');

/**
 * Adds a node to the nodes. 
 *
 * NOTE: Doesn't trigger an Event. So calling this directly won't trigger a re-render
 * @param {object} properties Properties of the node.
 */
function addNode(node) {
    node = _.isObject(node) ? node : {};
    var parent;

    if(node.id === undefined) {
        node.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    }

    if(node.parent === undefined) {
        node.parent = 'root';
    }

    if(!_.isArray(node.children)) {
        node.children = [];
    }

    _nodes[node.id] = node;

    return node;
}

function findNode(id) {
    if(_.isObject(_nodes[id])){
        return _nodes[id];
    }

    return undefined;
}

function updateNode(id, properties, nested_properties) {
    if(_.isObject(_nodes[id])){
        if(_.isString(properties)) {
            _nodes[id][properties] = _nodes[id][properties] || {};
            return _.extend(_nodes[id][properties], nested_properties);
        }else if(_.isObject(properties)) {
            return _.extend(_nodes[id], properties);
        }
    }

    throw new Error('Error in updating node');
}

function addChildNode(properties, position) {
    var parent = findNode(properties.parent) || findNode('root');

    if(parent) {
        addNode(properties);

        if(position === 'first') {
            parent.children.unshift(properties.id);
        }else{
            parent.children.push(properties.id);
        }

        return properties;
    }

    throw new Error('Parent does not exist');
}

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

module.exports = new Store();