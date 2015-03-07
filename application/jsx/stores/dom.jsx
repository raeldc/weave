var Dispatcher   = require('application/alchemy/dispatcher.js');
var CONST        = require('application/constants/dom.js');
var _DOM         = {};

var DOM = {
    get: function(id) {
        return _DOM[id];
    },

    insert: function(id, element) {
        if(element.nodeName) {
            _DOM[id] = element;
            return element;
        }

        throw new Error('Element is not a DOM Node');
    },

    remove: function(id) {
        delete _DOM[id];
        return this;
    }
};

module.exports = Object.freeze(DOM);