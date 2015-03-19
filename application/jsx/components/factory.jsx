var Nodes      = require('application/stores/nodes.js');
var Components = require('application/stores/components.js');
var UIConfig   = require('application/stores/uiconfig.js');

var Factory = {
    createNode: function(id) {
        var properties = Nodes.get(id);

        if(properties) {
            var component = Components.get(properties.component);

            return React.createElement(component.reactComponent, {
                id             : properties.id,
                key            : properties.id,
                component      : component.name,
                allowedChildren: component.allowedChildren || [],
                defaults       : component.defaults || {},
                editMode       : true,
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
    }
};

module.exports = Factory;