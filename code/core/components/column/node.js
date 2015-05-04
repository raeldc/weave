var Nodes      = require('core/stores/nodes.js'),
    Childable  = require('core/components/node/mixins/childable.js'),
    Changeable = require('core/components/node/mixins/changeable.js'),
    Eventable  = require('core/components/node/mixins/eventable.js'),
    Editable   = require('core/components/node/mixins/editable.js'),
    Stylable   = require('core/components/node/mixins/stylable.js'),
    Classable  = require('core/components/node/mixins/classable.js');

module.exports = React.createClass({
    mixins: [Childable, Eventable, Changeable, Editable, Stylable, Classable],

    getInitialState: function() {
        return Nodes.get(this.props.id);
    },

    render: function() {
        var properties = {};
        var span       = this.getColspan();

        this.addClass('col-lg-'+span);
        this.addClass('col-md-'+span);
        this.addClass('col-sm-'+span);
        this.addClass('col-xs-'+span);

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
    },

    getColspan: function() {
        var colspan = Nodes.get(this.state.id).colspan || 1;
        var columns = Nodes.get(this.state.parent).columns || 4;

        return colspan * (12 / columns);
    },
});