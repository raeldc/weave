var EventEmitter = require('events').EventEmitter;
var Dispatcher   = require('application/alchemy/dispatcher.js');
var CONST        = require('application/constants/nodes.js');
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
            this.emit(CONST.NODE_CHANGED + '_' + id);
        }
    },

    addChild: function(properties, position) {
        var parent = this.get(properties.parent) || this.get('root');

        if(parent) {
            addNode(properties);

            if(position === 'first') {
                parent.children.unshift(properties.id);
            }else{
                parent.children.push(properties.id);
            }

            this.emit(CONST.NODE_CHANGED + '_' + parent.id);
            return properties;
        }

        throw new Error('Parent does not exist');
    },

    addFirstChild: function(parent, properties) {
        properties.parent = parent;
        return this.addChild(properties, 'first');
    },

    addLastChild: function(parent, properties) {
        properties.parent = parent;
        return this.addChild(properties, 'last');
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
        this.emit(CONST.NODE_REMOVED + '_' + id);
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
        case CONST.NODE_ACTION_EDITMODE_ON:
            Nodes.set(command.subject, {
                editmode_on: true,
            });
        break;
        case CONST.NODE_ACTION_EDITMODE_OFF:
            Nodes.set(command.subject, {
                editmode_on: false,
            });
        break;
    }
});

module.exports = Nodes;