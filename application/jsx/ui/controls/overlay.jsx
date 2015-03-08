var Factory        = require('application/components/factory.js');
var LifeCycleMixin = require('application/components/node/mixins/lifecycle.js');
var CONST          = require('application/constants/all.js');
var cx             = require('react/lib/cx');

module.exports = React.createClass({
    mixins: [LifeCycleMixin],

    render: function() {
        var className = this.state.className || '';

        this.props.children.unshift(
            <div className="controls" key="controls">
                <div className="buttons">These are buttons</div>
            </div>
        );

        return React.createElement('div', {
            style      : this.state.style,
            className  : 'ui-control-overlay' + ' ' + className,
            id         : this.props.id
        }, this.props.children);
    },

    onMouseOver: function(event) {

        event.stopPropagation();
    },

    onMouseOut: function(event) {

        event.stopPropagation();
    }
});
