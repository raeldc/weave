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
            var $node   = jQuery(node);
            var offset = $node.offset();

            _DOM[id] = {
                id  : id,
                node  : $node,
                left  : offset.left,
                top   : offset.top,
                width : $node.width(),
                height: $node.height()
            };

            return this;
        }

        throw new Error('Element is not a DOM Node');
    },

    remove: function(id) {
        delete _DOM[id];
        return this;
    },

    getNodesHitByCursor: function(x, y) {
        var nodes = [];

        _.each(_DOM, function(node, index){
            if(x >= node.left && x <= node.left + node.width && y >= node.top && y <= node.top + node.height) {
                nodes.push(node);
            }
        });

        return nodes;
    }
};

module.exports = Object.freeze(DOM);