var UIActions = require('application/ui/actions.js');

module.exports = {
    getInitialState: function() {
        this.addEvent('onMouseOver', this.addHoverClass);
        this.addEvent('onMouseOut', this.removeHoverClass);
        this.addEvent('onClick', this.selectNode);
    },

    addHoverClass: function(event) {
        this.addClass('hover');
        this.forceUpdate();
        event.stopPropagation();
    },

    removeHoverClass: function(event) {
        this.removeClass('hover');
        this.forceUpdate();
        event.stopPropagation();
    },

    selectNode: function(event) {
        UIActions.selectNode(this.props.id);
        event.stopPropagation();
    },
}