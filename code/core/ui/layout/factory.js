var Nodes      = require('core/stores/nodes.js'),
    Components = require('core/stores/components.js');

module.exports = {
    createNode: function(id) {
        var properties = Nodes.get(id);

        if(properties) {
            var component = Components.get(properties.component);
            var children  = this.createChildNodes(properties.children);

            return React.createElement(component.layout, {
                id : properties.id,
                key: properties.id
            }, children);
        }

        return null;
    },

    createChildNodes: function(children) {
        var childNodes = [];

        if(_.isArray(children) && _.size(children) > 0){
            _.each(children, function(id){
                var child = this.createNode(id);
                if(React.isValidElement(child)){
                    childNodes.push(child);
                }
            }.bind(this));
        }

        return childNodes;
    }
};