'use strict'

require('babelify/polyfill');

import CoreBuilder  from 'core'
import Utils        from 'core/lib/utils.js'

// UI Components
import Preview          from 'core/ui/preview'
import NodeConfig       from 'core/ui/controls/nodeconfig.js'
import Layout           from 'core/ui/layout'
import Devices          from 'core/ui/controls/topbar/devices.js'
import UIComponents     from 'core/ui/controls/components'
import UIPreviewOverlay from 'core/ui/preview/overlay'
import UIPreviewFactory from 'core/components/node/factory.js'

//Actions
import LayoutActions from 'core/actions/layout.js'


// Node Components
import Root   from 'core/components/root'
import Row    from 'core/components/row'
import Column from 'core/components/column'
import Text   from 'core/components/text'
import Title  from 'core/components/title'

// Register Node Components
CoreBuilder.Components.register(Root)
CoreBuilder.Components.register(Row)
CoreBuilder.Components.register(Column)
CoreBuilder.Components.register(Text)
CoreBuilder.Components.register(Title)

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
                    <UIComponents />
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
        <NodeConfig />,
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

    LayoutActions.selectNode.listen(function(){
        let $tab = jQuery('#accordion-section-themebuilder_styles')

        if(!$tab.hasClass('open')) {
            $tab.find('h3.accordion-section-title').trigger('click')
        }
    });
}