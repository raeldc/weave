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
}

export default CoreBuilder