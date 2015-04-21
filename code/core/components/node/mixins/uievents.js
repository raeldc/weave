var UICanvasActions   = require('core/actions/canvas.js'),
    UIControlsActions = require('core/actions/controls.js'),
    NodeActions       = require('core/actions/node.js'),
    UIConfig          = require('core/stores/uiconfig.js');

module.exports = {
    getInitialState: function() {
        if(this.props.editMode) {
            return {
                enableEditable: false
            }
        }
    },

    componentWillMount: function() {
        this.initiateEvents();
    },

    componentWillUpdate: function() {
        this.initiateEvents();  
    },

    initiateEvents: function() {
        if(this.props.editMode) {
            this.resetEvents();
            this.addEvent('onMouseOver', this.mouseOverNode);
            this.addEvent('onClick',     this.selectNode);
            this.addEvent('onBlur',      this.saveTextChanges);
            this.addEvent('onDragOver',  this.onDragOver);
            this.addEvent('onDrop',      this.onDrop);
        }
    },

    resetEvents: function() {
        if(this.props.editMode) {
            this.removeEvent('onMouseOver', this.mouseOverNode);
            this.removeEvent('onClick',     this.selectNode);
            this.removeEvent('onBlur',      this.saveTextChanges);
            this.removeEvent('onDragOver',  this.onDragOver);
            this.removeEvent('onDrop',      this.onDrop);
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
            NodeActions.updateText(this.props.id, event.target.innerHTML);
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
    },

    onDragOver: function(event) {
        var previousDropSubject = UIConfig.Canvas.get('pending_drop_subject');

        UICanvasActions.droppingOnNode(this.props.id, this, event);

        if(previousDropSubject !== this.props.id) {
            UICanvasActions.mouseOverNode(this.props.id, this);
        }

        event.preventDefault();
        event.stopPropagation();
    },

    onDrop: function(event) {
        var component = UIConfig.Canvas.get('pending_component'),
            subject   = UIConfig.Canvas.get('pending_drop_subject'),
            position  = UIConfig.Canvas.get('pending_drop_position');

        UICanvasActions.mouseOutNode();
        UICanvasActions.insertComponent(component, subject, position);

        event.stopPropagation();
    }
}