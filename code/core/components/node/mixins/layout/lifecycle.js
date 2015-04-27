var Nodes           = require('core/stores/nodes.js'),
    Canvas          = require('core/stores/canvas.js'),
    UICanvasFactory = require('core/ui/canvas/factory.js');

module.exports = {
    getInitialState: function() {
        return Nodes.get(this.props.id);
    }
}