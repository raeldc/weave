var UICanvasOverlayHover  = require('application/ui/canvas/overlay/hover.js'),
    UICanvasOverlaySelect = require('application/ui/canvas/overlay/select.js');

module.exports = React.createClass({
    render: function() {
        return (
            <svg id="ui-canvas-overlay">
                <UICanvasOverlayHover />
                <UICanvasOverlaySelect />
            </svg>
        );
    },

    shouldComponentUpdate: function() {
        return false;
    }
});