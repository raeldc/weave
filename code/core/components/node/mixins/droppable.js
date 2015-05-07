var LayoutActions = require('core/actions/layout.js'),
    UIConfig      = require('core/stores/uiconfig.js');

module.exports = {
    componentWillMount: function() {
        this.addEvent('onDragOver.droppable', this.onDragOver);
        this.addEvent('onDrop.droppable',     this.onDrop);
    },

    onDragOver: function(event) {
        var previousDropSubject = UIConfig.Preview.get('pending_drop_subject');

        LayoutActions.droppingOnNode(this.props.id, this, event);

        if(previousDropSubject !== this.props.id) {
            LayoutActions.mouseOverNode(this.props.id, this);
        }

        event.preventDefault();
        event.stopPropagation();
    },

    onDrop: function(event) {
        LayoutActions.droppedOnNode(this.props.id, this, event);
        event.stopPropagation();
    }
}