var Nodes = require('core/stores/nodes.js');

module.exports = {
    getInitialState: function() {
        return {open: false};
    },

    calculateOccupiedColumns: function(node) {
        var children = Nodes.get(node).children || [];
        var count    = 0;

        _.each(children, function(node) {
            count += Number(Nodes.get(node).colspan) || 0;
        });

        return count;
    },

    toggleOpen: function(event) {
        if(!this.state.open) {
            this.setState({open: true});

            this.bindClick()
        }else {
            this.setState({open: false});
            this.unbindClick()
        }

        event.stopPropagation();
    },

    bindClick: function() {
        jQuery(window).bind('click.select' + this.props.node, this.toggleOpen);
    },

    unbindClick: function() {
        jQuery(window).unbind('click.select' + this.props.node);
    }
}