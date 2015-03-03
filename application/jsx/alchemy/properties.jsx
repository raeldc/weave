var _            = require('underscore');
var EventEmitter = require('events').EventEmitter;

var _properties   = [];
var EVENT_CHANGED = 'changed';
var EVENT_REMOVED = 'removed';

module.exports = _.extend({
    initialize: function(properties) {
        _properties = properties;
    },

    get: function(id) {
        var index = _.findIndex(_properties, {id: id});

        if(_.isObject(_properties[index])){
            return _properties[index];
        }

        return {};
    },

    set: function(id, properties) {
        var index = _.findIndex(_properties, {id: id});

        if(_.isObject(_properties[index])){
            _.extend(_properties[index], properties);
            this.emit(EVENT_CHANGED + '_' + id);
        }
    },

    add: function(properties) {
        _properties.push(properties);
    },

    remove: function(id) {
        if(id === 'root') {
            return;
        }

        var node   = this.get(id);
        var parent = this.get(node.parent);

        parent.children =  _.without(parent.children, id);
        _properties     = _.without(_properties, node);

        this.emit(EVENT_REMOVED + '_' + id);
    },

    count: function(){
        return _.size(_properties);
    },

    addChangeListener: function(id, callback) {
        this.on(EVENT_CHANGED + '_' + id, callback);
    },

    removeChangeListener: function(id, callback) {
        this.removeListener(EVENT_CHANGED + '_' + id, callback);
    },

    addRemoveistener: function(id, callback) {
        this.on(EVENT_REMOVED + '_' + id, callback);
    },

    removeRemoveistener: function(id, callback) {
        this.removeListener(EVENT_REMOVED + '_' + id, callback);
    },
}, EventEmitter.prototype);