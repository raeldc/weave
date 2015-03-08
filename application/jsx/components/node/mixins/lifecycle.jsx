var Factory    = require('application/components/factory.js');
var Nodes      = require('application/stores/nodes.js');
var DOM        = require('application/stores/dom.js');
var CONST      = require('application/constants/dom.js');

module.exports = {
    getInitialState: function() {
        return Nodes.get(this.props.id);
    },
    componentDidMount: function() {
        Nodes.addChangeListener(this.props.id, this.onChange);
        DOM.insert(this.props.id, this.getDOMNode());
    },
    componentWillUnmount: function() { 
        Nodes.removeChangeListener(this.props.id, this.onChange);
        DOM.remove(this.props.id);
    },
    onChange: function() {
        this.setState(Nodes.get(this.props.id));
    },
    getChildren: function() {
        return Factory.createChildNodes(this.state.children) || this.state.text || null;
    }
}