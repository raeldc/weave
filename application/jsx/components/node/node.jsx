var React = require('react');

module.exports = React.createClass({
    getInitialState: function(){
        return Alchemy.Properties.get(this.props.id);
    },
    componentDidMount: function() {
        Alchemy.Properties.addNode(this);
    },
    componentWillUnmount: function() { 
        Alchemy.Properties.removeNode(this);
    },

    render: function() {
        var children = Alchemy.createChildNodes(this.state.children) || this.state.text || null;

        return React.createElement(this.state.element  || 'div', {
            key      : this.state.id,
            style    : this.state.style,
            className: this.state.className
        }, children);
    },
});