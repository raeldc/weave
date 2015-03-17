var UIActions = require('application/ui/actions.js');
var DOM       = require('application/stores/dom.js');
var CONST     = require('application/constants/all.js');

module.exports = {
    getInitialState: function() {
        this.addEvent('onMouseOver', this.mouseOverNode);
        this.addEvent('onMouseOut', this.mouseOutNode);
        this.addEvent('onClick', this.selectNode);
        this.addEvent('onBlur', this.checkTextChanges);
        this.addEvent('onInput', this.adjustSizeOfEditableArea);
    },

    mouseOverNode: function(event) {
        UIActions.mouseOverNode(this.props.id);
        event.stopPropagation();
    },

    mouseOutNode: function(event) {
        UIActions.mouseOutNode(this.props.id);
        event.stopPropagation();
    },

    selectNode: function(event) {
        if(!this.state.enableEditable) {
            UIActions.selectNode(this.props.id);
            this.enableEditable();
        }

        event.stopPropagation();
    },

    checkTextChanges: function(event) {
        if(this.isText()) {
            UIActions.changeText(this.props.id, event.target.innerHTML);
        }

        event.stopPropagation();
    },

    adjustSizeOfEditableArea: function(event) {
        DOM.emit(CONST.DOM_UPDATED + '_' + this.props.id, this.props.id);
    },

    enableEditable: function() {
        if(this.isText()) {
            this.state.enableEditable = true;
            this.forceUpdate();
        }

        // Disable when unselected
        UIActions.addNodeUnselectedListener(this.props.id, this.disableEditable);
    },

    disableEditable: function() {
        this.state.enableEditable = false;
        this.forceUpdate();

        // Remove the listener
        UIActions.removeNodeUnselectedListener(this.props.id, this.disableEditable);
    }
}