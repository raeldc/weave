var Nodes   = require('core/stores/nodes.js'),
    Factory = require('core/components/node/factory.js');

module.exports = {
    getChildren: function(props) {
        var nodes    = [],
            children = this.state.children || [],
            props    = _.extend({
                            type: this.props.type
                        }, props || {});

        if(!_.isArray(children) || _.size(children) === 0){
            return null;
        }

        _.each(children, function(id){
            var child = Factory.createNode(id, props);
            if(React.isValidElement(child)){
                nodes.push(child);
            }
        }.bind(this));

        return nodes;
    },
}