var UICanvasOverlayHover    = require('application/ui/canvas/overlay/hover.js'),
    UICanvasOverlaySelect   = require('application/ui/canvas/overlay/select.js'),
    UICanvasOverlayControls = require('application/ui/canvas/overlay/controls.js');

module.exports = React.createClass({
    render: function() {
        return (
            <div id="ui-canvas-overlay">
                <UICanvasOverlayControls />
                <svg>
                    <UICanvasOverlayHover />
                    <UICanvasOverlaySelect />
                </svg>
            </div>
        );
    },

    shouldComponentUpdate: function() {
        return false;
    }
});