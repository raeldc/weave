var Nodes         = require('core/stores/nodes.js'),
    Components    = require('core/stores/components.js'),
    LayoutStore   = require('core/stores/layout.js'),
    LayoutActions = require('core/actions/layout.js'),
    NodeActions   = require('core/actions/node.js');

module.exports = {
    getInitialState: function() {
        if(this.properties === undefined) {
            this.properties = {};
        }

        this.properties.draggable = true;

        return null;
    },

    componentWillMount: function() {        
        this.addEvent('onDragStart.movable', this.onDragStart);

        if(LayoutStore.get('drag_subject') === this.props.id) {
            this.addClass('invisible');
        }
        else this.removeClass('invisible');
    },

    componentWillUpdate: function() {        
        if(LayoutStore.get('drag_subject') === this.props.id) {
            this.addClass('invisible');
        }
        else this.removeClass('invisible');
    },

    show: function() {
        this.removeClass('invisible');
        this.forceUpdate();
    },

    hide: function() {
        this.addClass('invisible');
        this.forceUpdate();
    },

    componentWillUnmount: function() {
        if(this.stopListeningToStopDrag) {
            this.stopListeningToStopDrag();
        }
    },

    /**
     * onDragStart: Start an artificial Drag&Drop Sequence
     *     LayoutActions.startDrag(this.props.id, this);
     *     DragContainer renders the current node as child
     *         Gets its size
     *         Gets its position
     *         Tilt a little bit
     *         Then Follow the Mouse
     *     Droppable Nodes have mouseOver event
     *         onMouseOver, if a node is being dragged
     *             fire draggingOnTop, draggingOnRight, draggingOnBottom, draggingOnLeft, draggingInside
     *         onMouseOut, remove Dragging Event
     *         onMouseUp
     *             get the dragging Event
     *             insert node based on dragging event
     *     End the drag event right away
     *
     * onMouseUp: End the artificial Drag&Drop Sequence
     */
    onDragStart: function(event) {
        LayoutActions.startDrag(this.props.id, this, event);

        //Register mouseUp event on Window
        jQuery(window).on('mouseup.movable', function() {
            jQuery(window).unbind('mouseup.movable');
            LayoutActions.stopDrag();
        }.bind(this));

        this.stopListeningToStopDrag = LayoutActions.stopDrag.listen(this.show);

        event.stopPropagation();
        event.preventDefault();

        this.hide();
    }
}