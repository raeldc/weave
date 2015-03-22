var UIControlsActions = require('application/ui/controls/actions.js');
var UICanvasActions   = require('application/ui/canvas/actions.js');
var Store             = require('application/stores');

module.exports = new Store({
    canvas  : {device: 'desktop'},
    controls: {theme : 'light'}
}, [UICanvasActions, UIControlsActions], {
    onSetDevice: function(device) {
        this.getRaw('canvas').set('device', device);
        this.getStore('canvas').trigger(device);
    }
});