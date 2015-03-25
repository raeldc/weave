var UICanvasActions = require('application/actions/canvas.js'),
    Store           = require('application/stores');

module.exports = (new Store({device: 'desktop'})).setActions(UICanvasActions, {
    onSetDevice: function(device) {
        if(this.get('device') !== device) {
            this.set('device', device);
            this.trigger(device);
        }
    },
    onSelectNode: function(id) {
        if(this.get('selectedNode') !== id) {
            this.set('selectedNode', id);
            this.trigger(id);
        }
    },
    onDroppingOnNode: function(id) {
        if(this.get('pending_drop_subject') !== id) {
            this.set('pending_drop_subject', id);
        }
    },
    onDroppingOnNodePosition: function(position) {
        if(this.get('pending_drop_position') !== position) {
            this.set('pending_drop_position', position);
        }
    },
    onInsertingComponent: function(component) {
        this.set('pending_component', component);
    },
    onEndInsertingComponent: function(component) {
        this.set('pending_component',    null);
        this.set('pending_drop_subject', null);
    },
});