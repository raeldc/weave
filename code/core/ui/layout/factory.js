var Nodes      = require('core/stores/nodes.js'),
    Components = require('core/stores/components.js');

module.exports = {
    createNode: function(id, editMode) {
        var properties = Nodes.get(id);

        if(properties) {
            return React.createElement('div', {
                id       : properties.id,
                key      : properties.id,
                className: 'node'
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