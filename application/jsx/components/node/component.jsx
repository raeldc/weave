var LifeCycleMixin   = require('./mixins/lifecycle.js');
var MouseEventsMixin = require('./mixins/mouseevents.js');

module.exports = React.createClass({
    mixins: [LifeCycleMixin, MouseEventsMixin],

    render: function() {
        var className = this.state.className || '' ;
        var children  = this.children  || null;
        var html;

        props = {
            id             : this.props.id,
            style          : this.state.style,
            className      : this.state.className,
            contentEditable: this.state.contentEditable,
            onClick        : this.onClick,
            onDoubleClick  : this.onDoubleClick,
        };

        return React.createElement(this.state.element || this.props.defaults.element || 'div', props, children);
    },

    onClick: function(event) {
        event.stopPropagation();
    },

    onDoubleClick: function(event) {
        event.stopPropagation();
    },
});