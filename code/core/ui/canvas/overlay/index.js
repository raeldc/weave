var UICanvasOverlayHover    = require('core/ui/canvas/overlay/hover.js'),
    UICanvasOverlaySelect   = require('core/ui/canvas/overlay/select.js'),
    UICanvasOverlayControls = require('core/ui/canvas/overlay/controls.js');

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