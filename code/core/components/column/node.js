var Nodes         = require('core/stores/nodes.js'),
    LayoutStore   = require('core/stores/layout.js'),
    LayoutActions = require('core/actions/layout.js'),
    Childable     = require('core/components/node/mixins/childable.js'),
    Changeable    = require('core/components/node/mixins/changeable.js'),
    Eventable     = require('core/components/node/mixins/eventable.js'),
    Editable      = require('core/components/node/mixins/editable.js'),
    Stylable      = require('core/components/node/mixins/stylable.js'),
    Classable     = require('core/components/node/mixins/classable.js'),
    Colspanable   = require('core/components/column/mixins/colspanable.js'),
    Selectable    = require('core/components/node/mixins/selectable.js');

module.exports = React.createClass({
    mixins: [Childable, Eventable, Changeable, Editable, Stylable, Classable, Colspanable, Selectable],

    getInitialState: function() {
        return Nodes.get(this.props.id);
    },

    render: function() {
        var properties = {};

        this.addEvent('onClick', function() {
            LayoutActions.selectNode(this.props.id);
        });

        this.setColspan(properties);
        this.setEvents(properties);
        this.setEditable(properties);
        this.setStyles(properties);
        this.setClass(properties);

        return React.createElement(
            this.state.element || properties.element || 'div', 
            properties,
            this.getChildren()
        );
    }
});