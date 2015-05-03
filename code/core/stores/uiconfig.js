var CanvasStore   = require('core/stores/layout.js'),
    ControlsStore = require('core/stores/controls.js');

module.exports = {
    Canvas  : CanvasStore,
    Controls: ControlsStore,
    toObject: function() {
        return {
            canvas  : CanvasStore.toObject(),
            controls: ControlsStore.toObject()
        }
    }
}