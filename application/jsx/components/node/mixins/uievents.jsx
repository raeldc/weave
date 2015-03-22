var UICanvasActions   = require('application/ui/canvas/actions.js');
var UIControlsActions = require('application/ui/controls/actions.js');

module.exports = {
    getInitialState: function() {
        if(this.props.editMode) {
            this.addEvent('onMouseOver', this.mouseOverNode);
            this.addEvent('onMouseDown', this.selectNode);
            this.addEvent('onBlur', this.checkTextChanges);

            return {
                enableEditable: false
            }
        }
    },

    mouseOverNode: function(event) {
        UICanvasActions.mouseOverNode(this.props.id);
        event.stopPropagation();
    },

    selectNode: function(event) {
        if(!this.state.enableEditable) {
            UICanvasActions.selectNode(this.props.id);
            this.enableEditable();
            this.stopListeningToUnselectNode = UICanvasActions.unSelectNode.listen(this.disableEditable);
        }

        event.stopPropagation();
    },

    checkTextChanges: function(event) {
        if(this.isText()) {
            UIControlsActions.changeText(this.props.id, event.target.innerHTML);
        }

        event.stopPropagation();
    },

    enableEditable: function() {
        if(this.isText()) {
            this.nodeProperties.contentEditable = true;
            this.forceUpdate();
        }
    },

    disableEditable: function() {
        this.nodeProperties.contentEditable = false;
        this.forceUpdate();

        // Remove the listener
        this.stopListeningToUnselectNode();
    }
}