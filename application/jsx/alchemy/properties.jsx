var _            = require('underscore');
var EventEmitter = require('events').EventEmitter;

var _properties   = [];
var EVENT_CHANGED = 'changed';

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

    addChangeListener: function(id, callback) {
        this.on(EVENT_CHANGED + '_' + id, callback);
    },

    removeChangeListener: function(id, callback) {
        this.removeListener(EVENT_CHANGED + '_' + id, callback);
    },
}, EventEmitter.prototype);