var Components = require('core/stores/components.js'),
    UIConfig   = require('core/stores/uiconfig.js'),
    Nodes      = require('core/stores/nodes.js');

module.exports = React.createClass({
    getInitialState: function() {
        return UIConfig.Preview.toObject();
    },

    render: function() {
        var node = Nodes.get(this.state.selectedNode);

        if(node) {
            var component      = Components.get(node.component);
            var Configurations = _.map(component.configurations, function(config, index){
                return React.createElement(config, {
                    key          : 'config-'+index,
                    node         : node.id,
                    device       : this.state.device,
                    defaults     : component.defaults,
                    configurables: component.configurables,
                });
            }.bind(this));

            return ( 
                <div className="ui-nodeconfig">
                    {Configurations}
                </div>
            );
        }

        return <div />;
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        // Update only when the selected node is different from the previous one
        return this.state.selectedNode !== nextState.selectedNode || this.state.device !== nextState.device;
    },

    componentDidMount: function() {
        this.stopListeningToPreviewConfigChanges = UIConfig.Preview.listen(this.onPreviewConfigChanged);
    },

    componentWillUnmount: function() {
        this.stopListeningToPreviewConfigChanges();
    },

    onPreviewConfigChanged: function(node){
        this.setState(this.getInitialState());
    }
});