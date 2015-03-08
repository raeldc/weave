var LifeCycleMixin   = require('./mixins/lifecycle.js');
var MouseEventsMixin = require('./mixins/mouseevents.js');
var cx               = require('react/lib/cx');

module.exports = React.createClass({
    mixins: [LifeCycleMixin, MouseEventsMixin],

    render: function() {
        var className = this.state.className || '' ;

        return React.createElement(this.state.element  || 'div', {
            style    : this.props.insideOverlay ? {}  : this.state.style,
            className: this.props.insideOverlay ? ''  : this.state.className,
            id       : this.props.insideOverlay ? null: this.props.id
        }, this.getChildren());
    },

});