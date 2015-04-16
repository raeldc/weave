var CanvasStore   = require('core/stores/canvas.js'),
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