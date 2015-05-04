var Nodes      = require('core/stores/nodes.js'),
    Childable  = require('./mixins/childable.js'),
    Changeable = require('./mixins/changeable.js'),
    Eventable  = require('./mixins/eventable.js'),
    Editable   = require('./mixins/editable.js'),
    Stylable   = require('./mixins/stylable.js'),
    Classable  = require('./mixins/classable.js');

module.exports = React.createClass({
    mixins: [Childable, Eventable, Changeable, Editable, Stylable, Classable],

    getInitialState: function() {
        return Nodes.get(this.props.id);
    },

    render: function() {
        var properties = {};

        this.setDefaults(properties);
        this.setEvents(properties);
        this.setEditable(properties);
        this.setStyles(properties);
        this.setClass(properties);

        return React.createElement(
            this.state.element || properties.element || 'div', 
            properties,
            this.getChildren()
        );
    },

    setDefaults: function(properties) {
        return _.extend(properties || {}, this.props.component.defaults);
    }
});