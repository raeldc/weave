var Nodes         = require('core/stores/nodes.js'),
    LayoutActions = require('core/actions/layout.js'),
    LayoutStore   = require('core/stores/layout.js'),
    UIConfig      = require('core/stores/uiconfig.js');

module.exports = {
    componentWillMount: function() {
        this.registerEvents();
    },

    componentWillUpdate: function() {
        this.registerEvents();
    },

    resetNodeInfo: function(event) {
        this.nodeInfo       = undefined;
        this.cursorPosition = undefined;
    },

    registerEvents: function() {
        this.addEvent('onMouseOver.droppable', this.getNodeInfo);
        this.addEvent('onDragEnter.droppable', this.getNodeInfo);

        this.addEvent('onMouseMove.droppable', this.executeDraggingRules);
        this.addEvent('onDragOver.droppable', this.executeDraggingRules);

        this.addEvent('onMouseOut.droppable',  this.resetNodeInfo);
        this.addEvent('onDragLeave.droppable',  this.resetNodeInfo);

        // This only works when an new component from the Components Pane is dropped
        this.addEvent('onDrop.droppable',  function(event){
            if(LayoutStore.get('drag_subject') === this.props.id){
                Nodes.getStore(this.props.id).remove('unmounted');
                LayoutActions.stopDrag();
            }

            event.stopPropagation();
        }.bind(this));
    },

    /**
     * This detects if mouse is moving inside the element
     *
     * It checks if there is a drag subject
     *     then it fires events according to the cursor position
     *
     * Fires 
     *     draggingOnTop, 
     *     draggingOnRight, 
     *     draggingOnBottom, 
     *     draggingOnLeft, 
     *     draggingInside
     *     
     * @param  {object} event The event object
     * @return {null}       Returns nothing
     */
    executeDraggingRules: function(event) {
        var subject = LayoutStore.get('drag_subject') || false;

        if(subject) {
            if(
                this.cursorPosition !== 'top' &&
                typeof this.constructor.draggingOnTop === 'function' && 
                this.isDraggingOnArea(event, 'top') && 
                this.constructor.draggingOnTop.call(this, subject, this.props.id)
            ) 
                this.cursorPosition = 'top';
            else if(
                this.cursorPosition !== 'right' &&
                typeof this.constructor.draggingOnRight === 'function' && 
                this.isDraggingOnArea(event, 'right') && 
                this.constructor.draggingOnRight.call(this, subject, this.props.id)
            )
                this.cursorPosition = 'right';
            else if(
                this.cursorPosition !== 'bottom' && 
                typeof this.constructor.draggingOnBottom === 'function' && 
                this.isDraggingOnArea(event, 'bottom') && 
                this.constructor.draggingOnBottom.call(this, subject, this.props.id)
            )
                this.cursorPosition = 'bottom';
            else if(
                this.cursorPosition !== 'left' &&
                typeof this.constructor.draggingOnLeft === 'function' &&
                this.isDraggingOnArea(event, 'left') &&
                this.constructor.draggingOnLeft.call(this, subject, this.props.id)
            )
                this.cursorPosition = 'left';
            else if(
                this.cursorPosition !== 'inside' &&
                typeof this.constructor.draggingInside === 'function' &&
                this.isDraggingOnArea(event, 'inside') &&
                this.constructor.draggingInside.call(this, subject, this.props.id)
            )
                this.cursorPosition = 'inside';

            // If subject is being dragged in its placeholder, allow the drop.
            if(subject === this.props.id) {
                event.preventDefault();
            }
        }

        event.stopPropagation();
    },

    getNodeInfo: function() {
        var $target, nodeOffset;

        if(LayoutStore.get('drag_subject')) {
            $target    = jQuery(React.findDOMNode(this)),
            nodeOffset = $target.offset();

            this.nodeInfo = {
                width : $target.outerWidth(),
                height: $target.outerHeight(),
                top   : nodeOffset.top - jQuery(window).scrollTop(),
                left  : nodeOffset.left
            };

            return this.nodeInfo;
        }
    },

    isDraggingOnArea: function(event, area) {
        if(this.nodeInfo) {
            switch(area) {
                case 'top':
                    return event.clientY < (this.nodeInfo.top + (this.nodeInfo.height * .5));
                break;
                case 'right':
                    return event.clientX > this.nodeInfo.left + (this.nodeInfo.width - (this.nodeInfo.width * .5));
                break;
                case 'bottom':
                    return event.clientY > (this.nodeInfo.top + (this.nodeInfo.height - (this.nodeInfo.height * .5)));
                break;
                case 'left':
                    return  event.clientX < this.nodeInfo.left + (this.nodeInfo.width * .5);
                break;
                case 'inside':
                    return (event.clientX <= this.nodeInfo.left + this.nodeInfo.width) && (event.clientY <= this.nodeInfo.top + this.nodeInfo.height);
                break;
            }
        }

        return false;
    }
}