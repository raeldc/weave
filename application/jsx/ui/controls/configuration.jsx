var Factory  = require('application/components/factory.js');
var UIConfig = require('application/stores/uiconfig.js');
var Nodes    = require('application/stores/nodes.js');
var CONST    = require('application/constants/all.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            selected_node: null
        }
    },

    render: function() {
        var node = Nodes.get(this.state.selected_node);

        if(node) {
            var component = node.element || 'node';
            var ConfigUI  = Factory.getComponent('component-config-' + component);

            return <ConfigUI node={this.state.selected_node} key={this.state.selected_node} />;
        }

        return <div />;
    },

    selectNode: function(){
        var node = UIConfig.getConfig('selected_node');

        this.setState({
            selected_node: UIConfig.getConfig('selected_node')
        });
    },

    componentDidMount: function() {
        UIConfig.on(CONST.NODE_SELECTED, this.selectNode);
    },

    componentWillUnmount: function() {
        UIConfig.removeListener(CONST.NODE_SELECTED, this.selectNode);
    }
});