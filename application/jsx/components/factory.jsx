var Nodes      = require('application/stores/nodes.js');
var UIConfig   = require('application/stores/uiconfig.js');
var Components = {};

var Factory = {
    createNode: function(id) {
        var properties = Nodes.get(id);

        if(properties) {
            return React.createElement(this.getComponent(properties.element || 'node'), {
                id      : properties.id,
                key     : properties.id,
                editMode: true,
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
        if(React.DOM[name] === undefined) {
            if(Components[name] !== undefined) {
                return Components[name];
            }

            throw new Error('Node Component not found!');
        }else {
            return Components['node'];
        }
    }
};

module.exports = Factory;