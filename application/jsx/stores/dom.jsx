var Dispatcher = require('application/alchemy/dispatcher.js');
var CONST      = require('application/constants/dom.js');
var _DOM       = {};

var DOM = {
    get: function(id) {
        return _DOM[id];
    },

    getNode: function(id) {
        return _DOM[id].node;
    },

    insert: function(id, node) {
        if(node.nodeName) {
            _DOM[id] = node;

            return this;
        }

        throw new Error('Element is not a DOM Node');
    },

    remove: function(id) {
        delete _DOM[id];
        return this;
    }
};

module.exports = DOM;