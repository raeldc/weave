var LifeCycleMixin = require('./mixins/node/lifecycle.js'),
    EventsMixin    = require('./mixins/node/events.js'),
    EditModeMixin  = require('./mixins/node/editmode.js'),
    UIEventsMixin  = require('./mixins/node/uievents.js');

module.exports = React.createClass({
    mixins: [LifeCycleMixin, EventsMixin, EditModeMixin, UIEventsMixin],

    render: function() {
        this.nodeProperties.className = _.uniq(this.nodeProperties.classNames).join(' ');

        return React.createElement(
            this.state.element || this.props.defaults.element || 'div', 
            this.nodeProperties,
            this.children
        );
    },
});