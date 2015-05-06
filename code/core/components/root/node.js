var Nodes         = require('core/stores/nodes.js'),
    LayoutStore   = require('core/stores/layout.js'),
    LayoutActions = require('core/actions/layout.js'),
    Childable     = require('core/components/node/mixins/childable.js'),
    Changeable    = require('core/components/node/mixins/changeable.js'),
    Eventable     = require('core/components/node/mixins/eventable.js'),
    Stylable      = require('core/components/node/mixins/stylable.js'),
    Classable     = require('core/components/node/mixins/classable.js'),
    Colspanable   = require('core/components/column/mixins/colspanable.js'),
    Selectable    = require('core/components/node/mixins/selectable.js'),
    Hoverable     = require('core/components/node/mixins/hoverable.js');

module.exports = React.createClass({
    mixins: [Childable, Eventable, Changeable, Stylable, Classable, Selectable, Hoverable],

    getInitialState: function() {
        return Nodes.get(this.props.id);
    },

    componentWillMount: function() {
        this.addEvent('onMouseOut', function() {
            LayoutActions.mouseOutNode();
        });
    },

    render: function() {
        var properties = {};

        this.setEvents(properties);
        this.setStyles(properties);
        this.setClass(properties);

        return React.createElement('div', 
            properties,
            this.getChildren()
        );
    }
});