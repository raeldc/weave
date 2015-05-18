var Core             = require('core'),
    Utils            = require('core/lib/utils.js'),
    Preview          = require('core/ui/preview'),
    Layout           = require('core/ui/layout'),
    Devices          = require('core/ui/controls/topbar/devices.js'),
    Components       = require('core/ui/controls/components'),
    LayoutActions    = require('core/actions/layout.js'),
    UIPreviewFactory = require('core/components/node/factory.js'),
    UIPreviewOverlay = require('core/ui/preview/overlay');

// Register Node Components
CoreBuilder.Components.register(require('core/components/root'));
CoreBuilder.Components.register(require('core/components/row'));
CoreBuilder.Components.register(require('core/components/column'));
CoreBuilder.Components.register(require('core/components/text'));
CoreBuilder.Components.register(require('core/components/title'));

CoreBuilder.ThemeBuilder = function(config) {
    var frame  = config.preview || wp.customize.previewer.loading.targetWindow();
    var $frame = jQuery(frame);
    var query  = wp.customize.previewer.query;

    /**
     * Customize the query function so we can add the nodes data to the request query
     * @return {object} The query object for the request
     */
    wp.customize.previewer.query = function() {
        var values = query.call(wp.customize.previewer);
        return jQuery.extend(values, {
            nodes: CoreBuilder.Nodes.toObject()
        });
    };

    /**
     * Trigger framechange on various events
     * @param  {object} event Event Object
     */
    function onFrameEvent(event) {
        LayoutActions.frameChanged(null, event);
        event.stopPropagation();
    }

    $frame.scroll(onFrameEvent);
    $frame.resize(onFrameEvent);
    $frame.mouseup(onFrameEvent);

    /**
     * Render the Layout
     * @type {String}
     */
    React.render(
        <div id="corebuilder-controls" className="container-fluid">
            <div className="ui-controls-topbar">
                <div className="ui-controls-topbar-devices">
                    <Devices />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <Components />
                    <div id="corebuilder-layout">
                        <Layout />
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('corebuilder-controls')
    );

    /**
     * Render the Style Settings on the Sidebar of WP Customizer
     */
    React.render(
        <span>
            Styles
        </span>,
        document.getElementById('corebuilder-styles')
    );

    /**
     * Render the Nodes on the Preview
     */
    React.render(
        UIPreviewFactory.createNode('root'),
        frame.document.getElementById('corebuilder-container')
    );

    /**
     * Render the Overlay Boxes
     */
    React.render(
        <UIPreviewOverlay />,
        frame.document.getElementById('corebuilder-overlay')
    );

    /**
     * Set the device of the preview iFrame when it's changed
     */
    jQuery('#customize-preview iframe').addClass('desktop');

    LayoutActions.setDevice.listen(function(device){
        jQuery('#customize-preview iframe').removeClass('desktop laptop tablet phone');
        jQuery('#customize-preview iframe').addClass(device);
    });

    CoreBuilder.Nodes.listen(function(){
        wp.customize.trigger('change');
    });
}