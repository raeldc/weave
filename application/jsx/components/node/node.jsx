var NodeMixins = require('./mixin.js');

module.exports = React.createClass({
    mixins: [NodeMixins],

    render: function() {
        return React.createElement(this.state.element  || 'div', {
            key      : this.state.id,
            style    : this.state.style,
            className: this.state.className
        }, this.getChildren());
    },
});