var React = require('react');
var _     = require('underscore');

var Node       = require('application/components/node/node.js');
var Properties = require('./properties.js');
var API        = require('./api.js');

module.exports = {
    Node       : Node,
    API        : API,
    Properties : Properties,

    initialize: function(properties, container) {
        Properties.initialize(properties);

        React.render(
            this.createNode('root'),
            container
        );
    },

    createNode: function(id) {
        var nodeProperties = Properties.get(id);

        if(nodeProperties) {
            return React.createElement(Node, {
                id : nodeProperties.id,
                key: nodeProperties.id
            });
        }

        return null;
    },

    createChildNodes: function(children) {
        var childNodes = [];

        if(!_.isArray(children)){
            return null;
        }

        _.each(children, function(id){
            var child = this.createNode(id);
            if(React.isValidElement(child)){
                childNodes.push(child);
            }
        }.bind(this));

        return childNodes;
    }
};
