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
        if(LayoutStore.hasProperty('drag_subject')) {

            var cursorPosition = this.getCursorPosition(event.clientX, event.clientY);

            if(this.cursorPosition !== cursorPosition) {

                switch(cursorPosition) {
                    case 'inside':
                        LayoutActions.draggingInside(this.props.id);
                    break;
                    case 'top':
                        LayoutActions.draggingOnTop(this.props.id);
                    break;
                    case 'right':
                        LayoutActions.draggingOnRight(this.props.id);
                    break;
                    case 'bottom':
                        LayoutActions.draggingOnBottom(this.props.id);
                    break;
                    case 'left':
                        LayoutActions.draggingOnLeft(this.props.id);
                    break;
                }

                this.cursorPosition = cursorPosition;
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

    getCursorPosition: function(mouseX, mouseY) {
        var position = 'inside';

        if(this.nodeInfo) {

            if(mouseY < (this.nodeInfo.top + (this.nodeInfo.height * .2))) {
                position = 'top';
            }else if(mouseY > (this.nodeInfo.top + (this.nodeInfo.height - (this.nodeInfo.height * .2)))) {
                position = 'bottom';
            }

            if(mouseX < this.nodeInfo.left + (this.nodeInfo.width * .1)) {
                position = 'left'
            }else if(mouseX > this.nodeInfo.left + (this.nodeInfo.width - (this.nodeInfo.width * .1))) {
                position = 'right'
            }
        }

        return position;
    }
}