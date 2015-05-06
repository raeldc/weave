var UIPreviewOverlayHover    = require('core/ui/preview/overlay/hover.js'),
    UIPreviewOverlaySelect   = require('core/ui/preview/overlay/select.js'),
    UIPreviewOverlayControls = require('core/ui/preview/overlay/controls.js');

module.exports = React.createClass({
    render: function() {
        return (
            <svg>
                <UIPreviewOverlayHover />
                <UIPreviewOverlaySelect />
            </svg>
        );
    },

    shouldComponentUpdate: function() {
        return false;
    }
});