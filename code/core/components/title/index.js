// Components
import Node     from 'core/components/node/node.js'
import Layout   from 'core/components/node/layout.js'
import PaneView from 'core/components/node/paneview.js'

// Config UI
import Typography  from 'core/components/node/configuration/typography'
import Positioning from 'core/components/node/configuration/positioning.js'
import Dimensions  from 'core/components/node/configuration/dimensions.js'
import Box         from 'core/components/node/configuration/box.js'
import Styling     from 'core/components/node/configuration/styling.js'

module.exports = {
    name       : 'title',
    group      : 'content',
    title      : 'Header',
    description: 'A Title or Header',
    icon       : 'fa fa-header',
    node       : Node,
    layout     : Layout,
    paneview   : PaneView,
    configurations: [
        Typography,
        Box,
        Positioning,
        Dimensions,
        Styling,
    ],
    configurables:  {

    },
    defaults: {
        element: 'h1',
        text   : '[Title]'
    },
    rules: {
        parents: ['column']
    }
}