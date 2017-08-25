'use strict'

require('babelify/polyfill');

import CoreBuilder from 'core'
import Utils       from 'core/lib/utils.js'
import Styling     from 'core/stores/styling.js'

// UI Components
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
import Image  from 'core/components/image'

// Register Node Components
CoreBuilder.Components.register(Root)
CoreBuilder.Components.register(Row)
CoreBuilder.Components.register(Column)
CoreBuilder.Components.register(Text)
CoreBuilder.Components.register(Title)
CoreBuilder.Components.register(Image)

CoreBuilder.Desktop = function(config) {
    // Initialize the Preview
    jQuery('#customize-preview > iframe').ready(function() {
        var preview = this

        // Initialize the Nodes (must be replaced with saved values)
        CoreBuilder.Nodes.setData({root: {component: 'root', id: 'root'}})

        /**
         * Create Stylesheets for Device Queries
         * @see https://css-tricks.com/snippets/css/media-queries-for-standard-devices/
         */
        Styling.setDocument(preview)
                .getStylesheets()
                .create('all',     'all')
                .create('desktop', 'screen')
                .create('laptop',  'only screen and (min-width: 992px) and (max-width: 1199px)')
                .create('tablet',  'only screen and (min-width: 768px) and (max-width: 991px)')
                .create('phone',   'only screen and (min-width: 320px) and (max-width: 767px)')

        /**
         * Trigger windowchange on various events
         */
        {
            let $window = jQuery(window)

            function onWindowEvent(event) {
                LayoutActions.windowChanged(null, event)
                event.stopPropagation()
            }

            $window.scroll(onWindowEvent)
            $window.resize(onWindowEvent)
        }

        /**
         * Trigger framechange on various events
         */
        {
            let $preview = jQuery(preview)

            function onFrameEvent(event) {
                LayoutActions.frameChanged(null, event);
                event.stopPropagation()
            }

            $preview.scroll(onFrameEvent)
            $preview.resize(onFrameEvent)
            $preview.mouseup(onFrameEvent)
        }

        /**
         * Render the Layout
         */
        ReactDOM.render(
            <ThemeBuilderLayout />,
            document.getElementById('corebuilder-layout')
        )

        /**
         * Render the Style Settings on the Sidebar
         */
        ReactDOM.render(
            <Customizer />,
            document.getElementById('corebuilder-customizer')
        )

        /**
         * Set the device of the preview iFrame when it's changed
         */
        {
            let $preview = jQuery(preview)

            $preview.addClass('desktop');
            LayoutActions.setDevice.listen(function(device) {
                $preview.removeClass('desktop laptop tablet phone')
                $preview.addClass(device)
            });
        }

        /**
         * Set the class of #customize-preview on different screenLayouts
         */
        {
            let $preview = jQuery('#customize-preview')

            $preview.addClass('split')

            LayoutActions.setScreenLayout.listen(function (layout) {
                $preview.removeClass('split full minimized');
                $preview.addClass(layout);
            });

            LayoutActions.startResize.listen(function() {
                $preview.addClass('disable-events')
            })

            LayoutActions.stopResize.listen(function() {
                $preview.removeClass('disable-events')
            })

            LayoutActions.startDrag.listen(function() {
                $preview.addClass('disable-events')
            })

            LayoutActions.stopDrag.listen(function() {
                $preview.removeClass('disable-events')
            })
        }
    })
}

export default CoreBuilder