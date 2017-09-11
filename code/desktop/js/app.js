'use strict'

require('babelify/polyfill')

import CoreBuilder from 'core'
import Utils       from 'core/lib/utils.js'
import Styling     from 'core/stores/styling.js'

// Core UI Components
import UIControlsCustomizer from 'core/ui/controls/customizer.js'
import UILayoutDesktop      from 'core/ui/layout/desktop.js'
import UIControlsComponents from 'core/ui/controls/components.js'
import UIPreviewOverlay     from 'core/ui/preview/overlay'
import NodeFactory          from 'core/components/node/factory.js'

// Desktop UI Components
import UIControlsTopbar from './ui/controls/topbar.js'

//Actions
import LayoutActions from 'core/actions/layout.js'

// Node Components
import Root   from 'core/components/root'
import Row    from 'core/components/row'
import Column from 'core/components/column'
import Text   from 'core/components/text'
import Title  from 'core/components/title'
import Image  from 'core/components/image'

// Register Node Components
CoreBuilder.Components.register(Root)
CoreBuilder.Components.register(Row)
CoreBuilder.Components.register(Column)
CoreBuilder.Components.register(Text)
CoreBuilder.Components.register(Title)
CoreBuilder.Components.register(Image)

CoreBuilder.Desktop = function(config) {
    var $window          = jQuery(window)
    var $preview         = jQuery('#preview > iframe')
    var $previewDocument = $preview.contents()

    // Initialize the Preview
    jQuery($preview).load(function() {
        var previewDocument = $previewDocument.get(0)
        window.preview = previewDocument

        // Initialize the Nodes (must be replaced with saved values)
        CoreBuilder.Nodes.setData(config.data || {root: {component: 'root', id: 'root'}})

        /**
         * Create Stylesheets for Device Queries
         * @see https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
         */
        Styling.setDocument(previewDocument)
                .getStylesheets()
                .create('all',     'all')
                .create('desktop', 'screen')
                .create('laptop',  'only screen and (min-width: 992px) and (max-width: 1199px)')
                .create('tablet',  'only screen and (min-width: 768px) and (max-width: 991px)')
                .create('phone',   'only screen and (min-width: 320px) and (max-width: 767px)')

        /**
         * Trigger windowchange on various events
         */

        function onWindowEvent(event) {
            LayoutActions.windowChanged(null, event)
            event.stopPropagation()
        }

        $window.scroll(onWindowEvent)
        $window.resize(onWindowEvent)

        /**
         * Trigger framechange on various events
         */

        function onFrameEvent(event) {
            LayoutActions.frameChanged(null, event)
            event.stopPropagation()
        }

        $previewDocument.scroll(onFrameEvent)
        $previewDocument.resize(onFrameEvent)
        $previewDocument.mouseup(onFrameEvent)

        /**
         * Render the Overlay Boxes
         */
        ReactDOM.render(
            <UIPreviewOverlay />,
            previewDocument.getElementById('corebuilder-overlay')
        )

        /**
         * Render the Nodes on the Preview
         */
        ReactDOM.render(
            NodeFactory.createNode('root'),
            previewDocument.getElementById('corebuilder-preview')
        )

        /**
         * Render the UIControlsTopbar
         */
        ReactDOM.render(
            <UIControlsTopbar />,
            document.getElementById('topbar')
        )

        /**
         * Render the Layout
         */
        ReactDOM.render(
            <UILayoutDesktop />,
            document.getElementById('layout')
        )

        /**
         * Render the Overlay Boxes
         */
        ReactDOM.render(
            <UIControlsComponents />,
            window.document.getElementById('sidebar')
        )

        /**
         * Render the Style Settings on the Sidebar
         */
        // ReactDOM.render(
        //     <UIControlsCustomizer />,
        //     document.getElementById('corebuilder-customizer')
        // )

        /**
         * Set the device of the preview iFrame when it's changed
         */

        $preview.addClass('desktop')
        LayoutActions.setDevice.listen(function(device) {
            $preview.removeClass('desktop laptop tablet phone')
            $preview.addClass(device)
        })

        /**
         * Set the class of #customize-preview on different screenLayouts
         */
        // {
        //     let $preview = jQuery('#customize-preview')

        //     $preview.addClass('split')

        //     LayoutActions.setScreenLayout.listen(function (layout) {
        //         $preview.removeClass('split full minimized')
        //         $preview.addClass(layout)
        //     })

        //     LayoutActions.startResize.listen(function() {
        //         $preview.addClass('disable-events')
        //     })

        //     LayoutActions.stopResize.listen(function() {
        //         $preview.removeClass('disable-events')
        //     })

        //     LayoutActions.startDrag.listen(function() {
        //         $preview.addClass('disable-events')
        //     })

        //     LayoutActions.stopDrag.listen(function() {
        //         $preview.removeClass('disable-events')
        //     })
        // }
    })
}

export default CoreBuilder
