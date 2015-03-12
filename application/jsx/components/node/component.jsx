var LifeCycleMixin   = require('./mixins/lifecycle.js');
var MouseEventsMixin = require('./mixins/mouseevents.js');

module.exports = React.createClass({
    mixins: [LifeCycleMixin, MouseEventsMixin],

    render: function() {
        var className = this.properties.className || '' ;
        var children  = this.children  || null;
        var html;

        props = {
            id       : this.props.id,
            style    : this.properties.style,
            className: this.properties.className,
        };

        return React.createElement(this.properties.element || this.props.defaults.element || 'div', props, children);
    }
});