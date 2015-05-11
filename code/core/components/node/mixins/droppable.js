var LayoutActions = require('core/actions/layout.js'),
    LayoutStore   = require('core/stores/layout.js'),
    UIConfig      = require('core/stores/uiconfig.js');

module.exports = {
    componentWillMount: function() {
        this.addEvent('onMouseOver.droppable', this.getNodeInfo);
        this.addEvent('onMouseOut.droppable',  this.resetNodeInfo);
        this.addEvent('onMouseMove.droppable', this.setDraggingPosition);
    },

    resetNodeInfo: function(event) {
        this.nodeInfo       = undefined;
        this.cursorPosition = undefined;
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
    setDraggingPosition: function(event) {
        var subject = LayoutStore.get('drag_subject') || false;

        if(subject) {
            if(typeof this.constructor.draggingOnTop === 'function' && this.isDraggingOnArea(event, 'top') && this.cursorPosition !== 'top') {
                this.constructor.draggingOnTop(subject, this.props.id);
                this.cursorPosition = 'top';
            }else if(typeof this.constructor.draggingOnRight === 'function' && this.isDraggingOnArea(event, 'right') && this.cursorPosition !== 'right') {
                this.constructor.draggingOnRight(subject, this.props.id);
                this.cursorPosition = 'right';
            }else if(typeof this.constructor.draggingOnBottom === 'function' && this.isDraggingOnArea(event, 'bottom') && this.cursorPosition !== 'bottom') {
                this.constructor.draggingOnBottom(subject, this.props.id);
                this.cursorPosition = 'bottom';
            }else if(typeof this.constructor.draggingOnLeft === 'function' && this.isDraggingOnArea(event, 'left') && this.cursorPosition !== 'left') {
                this.constructor.draggingOnLeft(subject, this.props.id);
                this.cursorPosition = 'left';
            }else if(typeof this.constructor.draggingInside === 'function' && this.isDraggingOnArea(event, 'inside') && this.cursorPosition !== 'inside') {
                this.constructor.draggingInside(subject, this.props.id);
                this.cursorPosition = 'inside';
            }
        }

        event.stopPropagation();
    },

    getNodeInfo: function() {
        var $target    = jQuery(React.findDOMNode(this)),
            nodeOffset = $target.offset();

        this.nodeInfo = {
            width : $target.outerWidth(),
            height: $target.outerHeight(),
            top   : nodeOffset.top - jQuery(window.preview).scrollTop(),
            left  : nodeOffset.left
        };

        return this.nodeInfo;
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