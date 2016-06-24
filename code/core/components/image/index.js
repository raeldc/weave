// Components
import Node from 'core/components/node/node.js'
import Layout from 'core/components/node/layout.js'

// Config UI
import Box from 'core/components/node/configuration/box'
import Css from 'core/components/node/configuration/css.js'

module.exports = {
    name: 'image',
    title: 'Image',
    description: 'Individual images',
    icon: 'fa fa-header',
    node: Node,
    layout: Layout,
    paneview: PaneView,
    configurations: [
        Box,
        Css
    ],
    configurables: {},
    defaults: {
        element: 'img',
        classes: [
            'img'
        ]
    },
    rules: {
        parents: [
            'column'
        ]
    }
}
