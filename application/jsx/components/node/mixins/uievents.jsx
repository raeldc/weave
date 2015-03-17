var UIActions  = require('application/ui/actions.js');

module.exports = {
    getInitialState: function() {
        this.addEvent('onMouseOver', this.mouseOverNode);
        this.addEvent('onMouseOut', this.mouseOutNode);
        this.addEvent('onClick', this.selectNode);
        this.addEvent('onInput', this.checkTextChanges);
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

    enableEditable: function() {
        if(this.isText()) {
            this.state.enableEditable = true;
            this.addClass('editable');
            this.forceUpdate();
        }

        // Disable when unselected
        UIActions.addNodeUnselectedListener(this.props.id, this.disableEditable);
    },

    disableEditable: function() {
        this.removeClass('editable');
        this.state.enableEditable = false;
        this.forceUpdate();

        // Remove the listener
        UIActions.removeNodeUnselectedListener(this.props.id, this.disableEditable);
    }
}