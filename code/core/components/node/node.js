var Nodes      = require('core/stores/nodes.js'),
    Childable  = require('./mixins/childable.js'),
    Changeable = require('./mixins/changeable.js'),
    Eventable  = require('./mixins/eventable.js'),
    Editable   = require('./mixins/editable.js'),
    Stylable   = require('./mixins/stylable.js'),
    Classable  = require('./mixins/classable.js'),
    Selectable = require('./mixins/selectable.js'),
    Hoverable  = require('./mixins/hoverable.js');

module.exports = React.createClass({
    mixins: [Childable, Eventable, Changeable, Editable, Stylable, Classable, Selectable, Hoverable],

    getInitialState: function() {
        return Nodes.get(this.props.id);
    },

    render: function() {
        var properties     = this.properties || {};
        properties.classes = this.state.classes || []

        this.setEvents();
        this.setEditable();
        this.setStyles();
        this.setClass();

        return React.createElement(
            this.state.element || 'div', 
            properties,
            this.getChildren()
        );
    }
});