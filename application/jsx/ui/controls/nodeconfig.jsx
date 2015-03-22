var Components = require('application/stores/components.js'),
    UIConfig   = require('application/stores/uiconfig.js'),
    Nodes      = require('application/stores/nodes.js');

module.exports = React.createClass({
    getInitialState: function() {
        return UIConfig.Canvas.toObject();
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

            return ( 
                <div className="ui-nodeconfig">
                    {Configurations}
                </div>
            );
        }

        return <div />;
    },

    onUIConfigChanged: function(node){
        this.setState(this.getInitialState());
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        // Update only when the selected node is different from the previous one
        return this.state.selectedNode !== nextState.selectedNode;
    },

    componentDidMount: function() {
        this.stopListeningToUIConfigStore = UIConfig.Canvas.listen(this.onUIConfigChanged);
    },

    componentWillUnmount: function() {
        this.stopListeningToUIConfigStore();
    }
});