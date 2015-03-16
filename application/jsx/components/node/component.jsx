var LifeCycleMixin = require('./mixins/lifecycle.js');
var EventsMixin    = require('./mixins/events.js');
var EditModeMixin  = require('./mixins/editmode.js');
var UIEventsMixin  = require('./mixins/uievents.js');

module.exports = React.createClass({
    mixins        : [LifeCycleMixin, EventsMixin, EditModeMixin, UIEventsMixin],
    render: function() {
        return React.createElement(this.state.element || this.props.defaults.element || 'div', this.nodeProperties, this.children);
    },
});