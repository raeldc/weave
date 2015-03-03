var React = require('react');

module.exports = React.createClass({
    getInitialState: function(){
        return this.props.Alchemy.Properties.get(this.props.id);
    },
    componentDidMount: function() {
        this.props.Alchemy.Properties.addChangeListener(this.props.id, this.onChange);
    },
    componentWillUnmount: function() { 
        this.props.Alchemy.Properties.removeChangeListener(this.props.id, this.onChange);
    },
    onChange: function() {
        this.setState(this.props.Alchemy.Properties.get(this.props.id));
    },
    render: function() {
        var children = this.props.Alchemy.createChildNodes(this.state.children) || this.state.text || null;

        return React.createElement(this.state.element  || 'div', {
            key      : this.state.id,
            style    : this.state.style,
            className: this.state.className
        }, children);
    },
});