var PreviewStore   = require('core/stores/layout.js'),
    ControlsStore = require('core/stores/controls.js');

module.exports = {
    Preview  : PreviewStore,
    Controls: ControlsStore,
    toObject: function() {
        return {
            preview  : PreviewStore.toObject(),
            controls: ControlsStore.toObject()
        }
    }
}