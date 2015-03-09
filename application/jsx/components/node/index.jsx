var Factory          = require('application/components/factory.js');
var NodeConfig       = require('application/components/node/configuration');
var LifeCycleMixin   = require('./mixins/lifecycle.js');
var MouseEventsMixin = require('./mixins/mouseevents.js');
var cx               = require('react/lib/cx');

// Register the config for this item
Factory.registerComponent('component-config-node', NodeConfig);
Factory.registerComponent('component-config-p', NodeConfig);

module.exports = React.createClass({
    mixins: [LifeCycleMixin, MouseEventsMixin],

    render: function() {
        var className = this.state.className || '' ;
        var children  = this.children  || null;
        var html;

        props = {
            id       : this.props.insideOverlay ? null: this.props.id,
            style    : this.props.insideOverlay ? {}  : this.state.style,
            className: this.props.insideOverlay ? ''  : this.state.className,
        };

        if(_.isString(children)) {
            props.dangerouslySetInnerHTML = {
                __html: children
            };

            children = null;
        }

        return React.createElement(this.state.element  || 'div', props, children);
    }
});