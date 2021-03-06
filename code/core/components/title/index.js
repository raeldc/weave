// Components
import Node from 'core/components/node/node.js'
import Layout from 'core/components/node/layout.js'
import PaneView from 'core/components/node/paneview.js'

// Config UI
import Typography from 'core/components/node/configuration/typography'
import Box from 'core/components/node/configuration/box'
import Background from 'core/components/node/configuration/background/index.js'
import Css from 'core/components/node/configuration/css.js'

module.exports = {
    name: 'title',
    group: 'content',
    title: 'Header',
    description: 'A Title or Header',
    icon: 'fa fa-header',
    node: Node,
    layout: Layout,
    paneview: PaneView,
    configurations: [
        Typography,
        Background,
        Box,
        Css
    ],
    configurables: {

    },
    defaults: {
        element: 'h1',
        text: '[Title]'
    },
    rules: {
        parents: [ 'column' ]
    }
}
