var Nodes      = require('core/stores/nodes.js'),
    Components = require('core/stores/components.js');

module.exports = {
    createNode: function(id, editMode) {
        var properties = Nodes.get(id);

        if(properties) {
            var component = Components.get(properties.component);

            return React.createElement(component.node, {
                id       : properties.id,
                key      : properties.id,
                component: component.name,
                defaults : component.defaults || {},
                editMode : editMode,
            });
        }

        return null;
    },

    createChildNodes: function(children, editMode) {
        var childNodes = [];

        if(!_.isArray(children) || _.size(children) === 0){
            return null;
        }

        _.each(children, function(id){
            var child = this.createNode(id, editMode);
            if(React.isValidElement(child)){
                childNodes.push(child);
            }
        }.bind(this));

        return childNodes;
    }
};