var EventEmitter = require('events').EventEmitter;
var CONST        = require('./constants/nodes.js');
var _dispatcher  = require('application/alchemy/dispatcher.js');
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

module.exports = _.extend({
    setNodes: function(nodes) {
        _nodes = nodes;
        return this;
    },

    setDispatcher: function(dispatcher) {
        _dispatcher = dispatcher;
        return this;
    },

    getAll: function() {
        // Clone so that _nodes remain private
        return _.clone(_nodes);
    },

    get: function(id) {
        var index = _.findIndex(_nodes, {id: id});

        if(_.isObject(_nodes[index])){
            return _nodes[index];
        }

        return undefined;
    },

    set: function(id, properties) {
        var index = _.findIndex(_nodes, {id: id});

        if(_.isObject(_nodes[index])){
            _.extend(_nodes[index], properties);
            this.emit(CONST.EVENT_CHANGED + '_' + id);
        }
    },

    appendChild: function(parent, properties) {
        parent = this.get(parent);

        if(parent) {
            parent.children.push(addNode(properties).id);
            this.emit(CONST.EVENT_CHANGED + '_' + parent.id);
        }
    },

    prependChild: function(parent, properties) {
        parent = this.get(parent);

        if(parent) {
            parent.children.unshift(addNode(properties).id);
            this.emit(CONST.EVENT_CHANGED + '_' + parent.id);
        }
    },

    insertSibling: function(node, sibling, position) {
        var children   = [];
        var sibling    = this.get(sibling);
        var parent     = this.get(sibling.parent);
        var node       = _.isString(node) ? this.get(node) || addNode() : addNode(node);

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

        this.set(parent.id, {children: children});
    },

    insertBeforeSibling: function(node, sibling) {
        this.insertSibling(node, sibling, 'before');
    },

    insertAfterSibling: function(node, sibling) {
        this.insertSibling(node, sibling, 'after');
    },

    remove: function(id) {
        if(id === 'root') {
            return;
        }

        var node    = this.get(id);
        var parent  = this.get(node.parent);
        _nodes = _.without(_nodes, node);

        this.set(parent.id, {children: _.without(parent.children, id)});
        this.emit(CONST.EVENT_REMOVED + '_' + id);
    },

    count: function(){
        return _.size(_nodes);
    },

    addChangeListener: function(id, callback) {
        this.on(CONST.EVENT_CHANGED + '_' + id, callback);
    },

    removeChangeListener: function(id, callback) {
        this.removeListener(CONST.EVENT_CHANGED + '_' + id, callback);
    },

    addRemoveListener: function(id, callback) {
        this.on(CONST.EVENT_REMOVED + '_' + id, callback);
    },

    removeRemoveListener: function(id, callback) {
        this.removeListener(CONST.EVENT_REMOVED + '_' + id, callback);
    },
}, EventEmitter.prototype);