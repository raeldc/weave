var UICanvasActions   = require('application/ui/canvas/actions.js');
var UIControlsActions = require('application/ui/controls/actions.js');

module.exports = {
    getInitialState: function() {
        if(this.props.editMode) {
            this.addEvent('onMouseOver', this.mouseOverNode);
            this.addEvent('onMouseDown', this.selectNode);
            this.addEvent('onBlur', this.saveTextChanges);

            return {
                enableEditable: false
            }
        }
    },

    mouseOverNode: function(event) {
        UICanvasActions.mouseOverNode(this.props.id, this);
        event.stopPropagation();
    },

    selectNode: function(event) {
        if(!this.state.enableEditable) {
            UICanvasActions.selectNode(this.props.id, this);
            this.enableEditable();
            this.stopListeningToUnselectNode = UICanvasActions.unSelectNode.listen(this.disableEditable);
        }

        event.stopPropagation();
    },

    saveTextChanges: function(event) {
        if(this.isText()) {
            UIControlsActions.changeText(this.props.id, event.target.innerHTML);
        }

        event.stopPropagation();
    },

    textChanged: function(event) {
        if(this.isText() && this.nodeProperties.contentEditable) {
            UICanvasActions.nodeTouched();
        }

        event.stopPropagation();
    },

    enableEditable: function() {
        if(this.isText()) {
            // Add a new event when editable is enabled
            this.addEvent('onInput', this.textChanged);

            this.nodeProperties.contentEditable = true;
            this.forceUpdate();
        }
    },

    disableEditable: function() {
        this.nodeProperties.contentEditable = false;
        this.removeEvent('onInput', this.textChanged);

        // Remove the listener
        this.stopListeningToUnselectNode();
        this.forceUpdate();
    }
}