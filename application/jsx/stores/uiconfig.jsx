var CanvasStore   = require('application/stores/canvas.js'),
    ControlsStore = require('application/stores/controls.js');

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