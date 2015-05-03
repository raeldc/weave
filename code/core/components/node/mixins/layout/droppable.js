var LayoutActions = require('core/actions/layout.js'),
    UIConfig      = require('core/stores/uiconfig.js');

module.exports = {
    componentWillMount: function() {
        this.addEvent('onDragOver.droppable', this.onDragOver);
        this.addEvent('onDrop.droppable',     this.onDrop);
    },

    onDragOver: function(event) {
        var previousDropSubject = UIConfig.Canvas.get('pending_drop_subject');

        LayoutActions.droppingOnNode(this.props.id, this, event);

        if(previousDropSubject !== this.props.id) {
            LayoutActions.mouseOverNode(this.props.id, this);
        }

        event.preventDefault();
        event.stopPropagation();
    },

    onDrop: function(event) {
        var component = UIConfig.Canvas.get('pending_component');

        LayoutActions.insertComponent(component, this.props.id);

        event.stopPropagation();
    }
}