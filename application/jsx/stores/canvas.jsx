var UICanvasActions = require('application/actions/canvas.js'),
    NodeActions     = require('application/actions/node.js'),
    Store           = require('application/stores'),
    Nodes           = require('application/stores/nodes.js'),
    Components      = require('application/stores/components.js');

module.exports = (new Store({device: 'laptop'})).setActions(UICanvasActions, {
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
    onUnSelectNode: function() {
        this.set('selectedNode', null);
        this.trigger();
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
    onInsertComponent: function(component, subject, position) {
        var properties = _.extend({component: component}, Components.getDefaults(component));

        switch(position) {
            case 'bottom':
                NodeActions.insertNodeAfterSibling(properties, subject);
            break;
            case 'top':
                NodeActions.insertNodeBeforeSibling(properties, subject);
            break;
        }
    }
});