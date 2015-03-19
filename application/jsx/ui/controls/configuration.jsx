var Components = require('application/stores/components.js');
var UIActions  = require('application/ui/actions.js');
var Nodes      = require('application/stores/nodes.js');
var CONST      = require('application/constants/all.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            selectedNode: null
        }
    },

    render: function() {
        var node = Nodes.get(this.state.selectedNode);

        if(node) {
            var component      = Components.get(node.component);
            var Configurations = _.map(component.configurations, function(config, index){
                return React.createElement(config, {
                    key          : 'config-'+index,
                    node         : node.id,
                    defaults     : component.defaults,
                    configurables: component.configurables,
                });
            });

            if(!_.isEmpty(Configurations)) {
                return <div className="ui-configurations">{Configurations}</div>;
            }
        }

        return <div />;
    },

    configureNode: function(node){
        this.setState({
            selectedNode: node
        });
    },

    componentDidMount: function() {
        UIActions.on(CONST.NODE_SELECTED, this.configureNode);
    },

    componentWillUnmount: function() {
        UIActions.removeListener(CONST.NODE_SELECTED, this.configureNode);
    }
});