var NodeMixins  = require('./mixin.js');
var NodeActions = require('./actions.js');
var cx          = require('react/lib/cx');

module.exports = React.createClass({
    mixins: [NodeMixins, NodeActions],

    render: function() {
        return React.createElement(this.state.element  || 'div', {
            style    : this.state.style,
            className: cx({
                'editmode_on': this.state.editmode_on
            }) + ' ' + this.state.className,
            onMouseOver: this.editModeOn,
            onMouseOut: this.editModeOff
        }, this.getChildren());
    },
});