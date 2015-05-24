'use strict'

require('babelify/polyfill');

import CoreBuilder  from 'core'
import Utils        from 'core/lib/utils.js'

// UI Components
import Preview            from 'core/ui/preview'
import Customizer         from 'core/ui/controls/customizer.js'
import ThemeBuilderLayout from 'core/ui/layout/themebuilder.js'
import UIPreviewOverlay   from 'core/ui/preview/overlay'
import UIPreviewFactory   from 'core/components/node/factory.js'

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

    /**
     * Customize the query function so we can add the nodes data to the request query
     * @return {object} The query object for the request
     */
    {
        let query  = wp.customize.previewer.query;
        wp.customize.previewer.query = function() {
            var values = query.call(wp.customize.previewer);
            return jQuery.extend(values, {
                nodes: CoreBuilder.Nodes.toObject()
            });
        };
    }

    /**
     * Open the Styling options on the sidebar
     */
    {
        let openStyles = () => {
            let $tab = jQuery('#accordion-section-themebuilder_styles')
            if(!$tab.hasClass('open')) {
                $tab.find('h3.accordion-section-title').trigger('click')
            }
        }

        // Open it on page load
        openStyles()

        // Open it when a node is selected and it's closed
        LayoutActions.selectNode.listen(openStyles)
    }

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
        <ThemeBuilderLayout />,
        document.getElementById('corebuilder-layout')
    );

    /**
     * Render the Style Settings on the Sidebar of WP Customizer
     */
    React.render(
        <Customizer />,
        document.getElementById('corebuilder-customizer')
    );

    /**
     * Render the Nodes on the Preview
     */
    React.render(
        UIPreviewFactory.createNode('root'),
        frame.document.getElementById('corebuilder-preview')
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

    /**
     * Set the class of #customize-preview on different screenLayouts
     */

     jQuery('#customize-preview').addClass('split');

    LayoutActions.setScreenLayout.listen(function(layout){
        jQuery('#customize-preview').removeClass('split full minimized');
        jQuery('#customize-preview').addClass(layout);
    });

    /**
     * Trigger a change when something in the Nodes is updated
     */
    CoreBuilder.Nodes.listen(function(){
        wp.customize.trigger('change');
    });
}