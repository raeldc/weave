var _            = require('underscore');
var EventEmitter = require('events').EventEmitter;
var CONST        = require('./constants/nodes.js');
var _dispatcher  = require('application/alchemy/dispatcher.js');
var _nodes       = [];

module.exports = _.extend({
    setNodes: function(nodes) {
        _nodes = nodes;
        return this;
    },

    setDispatcher: function(dispatcher) {
        _dispatcher = dispatcher;
        return this;
    },

    get: function(id) {
        var index = _.findIndex(_nodes, {id: id});

        if(_.isObject(_nodes[index])){
            return _nodes[index];
        }

        return {};
    },

    set: function(id, properties) {
        var index = _.findIndex(_nodes, {id: id});

        if(_.isObject(_nodes[index])){
            _.extend(_nodes[index], properties);
            this.emit(CONST.EVENT_CHANGED + '_' + id);
        }
    },

    add: function(properties) {
        _nodes.push(properties);
    },

    remove: function(id) {
        if(id === 'root') {
            return;
        }

        var node    = this.get(id);
        var parent  = this.get(node.parent);
        _nodes = _.without(_nodes, node);

        this.set(parent.id, {children: _.without(parent.children, id)});
        this.emit(EVENT_REMOVED + '_' + id);
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

    addRemoveistener: function(id, callback) {
        this.on(EVENT_REMOVED + '_' + id, callback);
    },

    removeRemoveistener: function(id, callback) {
        this.removeListener(CONST.EVENT_REMOVED + '_' + id, callback);
    },
}, EventEmitter.prototype);