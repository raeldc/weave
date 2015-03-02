var _ = require('underscore');

var _properties = [];
var _nodes      = {};

module.exports = {
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
            this.changed(id);
        }
    },

    changed: function(id) {
        var node = _nodes[id];

        if(node){
            node.setState(this.get(id));
        }
    },

    addNode: function(node) {
        _nodes[node.props.id] = node;
    },

    removeNode: function(node) {
        delete _nodes[node.props.id];
    }
};