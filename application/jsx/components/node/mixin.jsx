var Factory = require('application/components/node/factory.js');
var Nodes   = require('application/stores/nodes.js');

module.exports = {
    getInitialState: function() {
        return this.props.nodes.get(this.props.id);
    },
    componentDidMount: function() {
        this.props.nodes.addChangeListener(this.props.id, this.onChange);
    },
    componentWillUnmount: function() { 
        this.props.nodes.removeChangeListener(this.props.id, this.onChange);
    },
    onChange: function() {
        this.setState(this.props.nodes.get(this.props.id));
    },
    getChildren: function() {
        return this.props.factory.createChildNodes(this.state.children) || this.state.text || null;
    }
}