var Core             = require('core'),
    Utils            = require('core/lib/utils.js'),
    Preview          = require('core/ui/preview'),
    Layout           = require('core/ui/layout'),
    Devices          = require('core/ui/controls/topbar/devices.js'),
    Components       = require('core/ui/controls/components'),
    LayoutActions    = require('core/actions/layout.js'),
    demodata         = require('core/demolayout.js'),
    UIPreviewFactory = require('core/components/node/factory.js'),
    UIPreviewOverlay = require('core/ui/preview/overlay');

// Register Node Components
CoreBuilder.Components.register(require('core/components/root'));
CoreBuilder.Components.register(require('core/components/row'));
CoreBuilder.Components.register(require('core/components/column'));
CoreBuilder.Components.register(require('core/components/text'));
CoreBuilder.Components.register(require('core/components/title'));

CoreBuilder.ThemeBuilder = function(config) {
    CoreBuilder.Nodes.setData(_.extend({root: {id: 'root', component: 'root'}}, demodata));

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

    React.render(
        <span>
            Styles
        </span>,
        document.getElementById('corebuilder-styles')
    );

    var stopListeningToChangeDevice = LayoutActions.setDevice.listen(function(device){
        jQuery('#customize-preview iframe').removeClass('desktop laptop tablet phone');
        jQuery('#customize-preview iframe').addClass(device);
    });
}

jQuery(document).ready(function(){
    wp.customize.previewer.loading.done(function(){
        var frame  = this.targetWindow();
        var $frame = jQuery(frame);

        function onFrameEvent(event) {
            LayoutActions.frameChanged(null, event);
            event.stopPropagation();
        }

        $frame.scroll(onFrameEvent);
        $frame.resize(onFrameEvent);
        $frame.mouseup(onFrameEvent);

        jQuery('#customize-preview iframe').addClass('desktop');

        CoreBuilder.ThemeBuilder();

        React.render(
            UIPreviewFactory.createNode('root'),
            frame.document.getElementById('corebuilder-container')
        );

        React.render(
            <UIPreviewOverlay />,
            frame.document.getElementById('corebuilder-overlay')
        );
    });
});