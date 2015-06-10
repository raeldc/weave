'use strict'

import Node   from 'core/components/column/node.js'
import Layout from 'core/components/column/layout.js'

// Config UI
import Box         from 'core/components/node/configuration/box.js'
import Background  from 'core/components/node/configuration/background.js'

export default {
    name       : 'column',
    title      : 'Column',
    description: '',
    iconClass  : '',
    node       : Node,
    layout     : Layout,
    defaults   : {
        element: 'div',
        classes: ['column'],
        colspan: {
            desktop: 1,
            laptop : 2
        }
    },
    configurations: [
        Background,
        Box
    ],
    rules: {
        parents: ['row']
    }
}