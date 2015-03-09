var EventEmitter = require('events').EventEmitter;
var Dispatcher   = require('application/alchemy/dispatcher.js');
var CONST        = _.extend(require('application/constants/nodes.js'), require('application/constants/ui.js'));
var _nodes       = [];

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

    if(_.findIndex(_nodes, {id: node.id}) === -1 ) {
        _nodes.push(node);
    }

    return node;
}

function findNode(id) {
    var index = _.findIndex(_nodes, {id: id});

    if(_.isObject(_nodes[index])){
        return _nodes[index];
    }

    return undefined;
}

function updateNode(id, properties, nested_properties) {
    var index = _.findIndex(_nodes, {id: id});

    if(_.isObject(_nodes[index])){
        if(_.isString(properties)) {
            _nodes[index][properties] = _nodes[index][properties] || {};
            return _.extend(_nodes[index][properties], nested_properties);
        }else if(_.isObject(properties)) {
            return _.extend(_nodes[index], properties);
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
    _nodes = _.without(_nodes, node);

    updateNode(parent.id, {children: _.without(parent.children, id)});
}

var Nodes = _.extend({
    initialize: function(nodes) {
        _nodes = nodes;
        return this;
    },

    getAll: function() {
        // Clone so that _nodes remain private
        return _.clone(_nodes);
    },

    get: function(id) {
        return findNode(id);
    },

    count: function(){
        return _.size(_nodes);
    },

    addChangeListener: function(id, callback) {
        this.on(CONST.NODE_CHANGED + '_' + id, callback);
    },

    removeChangeListener: function(id, callback) {
        this.removeListener(CONST.NODE_CHANGED + '_' + id, callback);
    },

    addRemoveListener: function(id, callback) {
        this.on(CONST.NODE_REMOVED + '_' + id, callback);
    },

    removeRemoveListener: function(id, callback) {
        this.removeListener(CONST.NODE_REMOVED + '_' + id, callback);
    },
}, EventEmitter.prototype);

Nodes.dispatchToken = Dispatcher.register(function(command) {
    switch(command.action) {
        case CONST.NODE_ACTION_UPDATE_NODE:
            updateNode(command.node, command.properties);
            Nodes.emit(CONST.NODE_CHANGED + '_' + command.node);
            Nodes.emit(CONST.NODE_CHANGED);
        break;
        case CONST.NODE_ACTION_UPDATE_NODE_STYLE:
            updateNode(command.node, 'style', command.style);
            Nodes.emit(CONST.NODE_CHANGED + '_' + command.node);
            Nodes.emit(CONST.NODE_CHANGED);
        break;
    }
});

module.exports = Nodes;