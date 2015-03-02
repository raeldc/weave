var Alchemy = {
    initialize: function(properties, container) {
        Alchemy.Properties.initialize(properties);

        React.render(
            this.createNode('root'),
            container
        );
    },

    createNode: function(id) {
        var nodeProperties = Alchemy.Properties.get(id);

        if(nodeProperties) {
            return React.createElement(Alchemy.Node, {
                id: nodeProperties.id
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