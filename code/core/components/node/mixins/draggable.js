var Nodes         = require('core/stores/nodes.js'),
    Components    = require('core/stores/components.js'),
    LayoutActions = require('core/actions/layout.js'),
    NodeActions   = require('core/actions/node.js');

module.exports = {
    getInitialState: function() {
        if(this.properties === undefined) {
            this.properties = {};
        }
    },

    componentWillMount: function() {        
        this.addEvent('onDragStart.movable', this.onDragStart);
        this.properties.draggable = true;
    },

    componentWillUpdate: function() {
        this.properties.draggable = true;
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
        LayoutActions.startDrag(this.props.id, this);

        //Register mouseUp event on Window
        jQuery(window).on('mouseup.movable', function() {
            jQuery(window).unbind('mouseup.movable');
            LayoutActions.stopDrag();
        });

        event.stopPropagation();
        event.preventDefault();
    }
}