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
    name       : 'text',
    group      : 'content',
    title      : 'Paragraph',
    description: 'A paragraph of text',
    icon       : 'fa fa-paragraph',
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
        element: 'p',
        text   : '[Text]'
    },
    rules: {
        parents: ['column']
    }
}