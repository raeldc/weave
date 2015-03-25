var UIControlsActions = require('application/ui/controls/actions.js');
var UICanvasActions   = require('application/ui/canvas/actions.js');
var Store             = require('application/stores');

var UIConfig =  new Store({
    canvas  : {device: 'desktop'},
    controls: {theme : 'light'}
});

var CanvasStore = UIConfig.getStore('canvas').setActions(UICanvasActions, {
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
    }
});

var ControlsStore = UIConfig.getStore('controls').setActions(UIControlsActions, {

});

module.exports = {
    Canvas  : CanvasStore,
    Controls: ControlsStore
}