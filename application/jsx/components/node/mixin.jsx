var Nodes = require('application/stores/nodes.js');

module.exports = {
    getInitialState: function() {
        return Nodes.get(this.props.id);
    },
    componentDidMount: function() {
        Nodes.addChangeListener(this.props.id, this.onChange);
    },
    componentWillUnmount: function() { 
        Nodes.removeChangeListener(this.props.id, this.onChange);
    },
    onChange: function() {
        this.setState(Nodes.get(this.props.id));
    },
    getChildren: function() {
        return this.props.factory.createChildNodes(this.state.children) || this.state.text || null;
    }
}