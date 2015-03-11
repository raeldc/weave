var Factory          = require('application/components/factory.js');
var NodeConfig       = require('application/components/node/configuration');
var LifeCycleMixin   = require('./mixins/lifecycle.js');
var MouseEventsMixin = require('./mixins/mouseevents.js');
var cx               = require('react/lib/cx');

// Register the config for this item
Factory.registerComponent('component-config-node', NodeConfig);
Factory.registerComponent('component-config-p', NodeConfig);
Factory.registerComponent('component-config-h1', NodeConfig);

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

        return React.createElement(this.properties.element  || 'div', props, children);
    }
});