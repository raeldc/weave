var Nodes   = require('core/stores/nodes.js'),
    Factory = require('core/ui/layout/factory.js');

module.exports = {
    getChildren: function(children) {
        var nodes    = [];
        var children = children || this.state.children || [];

        if(!_.isArray(children) || _.size(children) === 0){
            return null;
        }

        _.each(children, function(id){
            var child = Factory.createNode(id);
            if(React.isValidElement(child)){
                nodes.push(child);
            }
        }.bind(this));

        return nodes;
    },
}