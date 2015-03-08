var LifeCycleMixin   = require('./mixins/lifecycle.js');
var MouseEventsMixin = require('./mixins/mouseevents.js');
var cx               = require('react/lib/cx');

module.exports = React.createClass({
    mixins: [LifeCycleMixin, MouseEventsMixin],

    render: function() {
        return React.createElement(this.state.element  || 'div', {
            style      : this.state.style,
            className  : this.state.className
        }, this.getChildren());
    },

});