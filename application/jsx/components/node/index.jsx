var LifeCycleMixin   = require('./mixins/lifecycle.js');
var MouseEventsMixin = require('./mixins/mouseevents.js');
var cx               = require('react/lib/cx');

module.exports = React.createClass({
    mixins: [LifeCycleMixin, MouseEventsMixin],

    render: function() {
        var className = this.state.className || '';
        return React.createElement(this.state.element  || 'div', {
            style    : this.state.style,
            className: className,
            id       : this.props.id
        }, this.getChildren());
    },

});