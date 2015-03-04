_              = require('underscore');
var Nodes      = require('application/alchemy/nodes.js');
var Components = {};

var Factory = {
    setNodes: function(nodes) {
        Nodes = nodes;
        return this;
    },

    createNode: function(id) {
        var properties = Nodes.get(id);

        if(properties) {
            return React.createElement(this.getComponent(properties.element || 'default'), {
                id     : properties.id,
                key    : properties.id,
                factory: this,
                nodes  : Nodes,
            });
        }

        return null;
    },

    createChildNodes: function(children) {
        var childNodes = [];

        if(!_.isArray(children) || _.size(children) === 0){
            return null;
        }

        _.each(children, function(id){
            var child = this.createNode(id);
            if(React.isValidElement(child)){
                childNodes.push(child);
            }
        }.bind(this));

        return childNodes;
    },

    registerComponent: function(name, component) {
        Components[name] = component;
        return this;
    },

    getComponent: function(name) {
        if(Components[name] === undefined) {
            name = 'default';
        }

        return Components[name];
    }
};

Factory.registerComponent('default', require('application/components/node/node.js'));

module.exports = Factory;