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
            var ConfigUI = Components.getReactConfigClass(node.component);
            if(ConfigUI) {
                return <ConfigUI node={this.state.selectedNode} key={this.state.selectedNode} />;
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