'use strict'

import Node   from 'core/components/column/node.js'
import Layout from 'core/components/column/layout.js'

export default {
    name       : 'column',
    title      : 'Column',
    description: '',
    iconClass  : '',
    node       : Node,
    layout     : Layout,
    defaults   : {
        element: 'div',
        colspan: {
            desktop: 1,
            laptop : 2
        }
    },
    rules: {
        parents: ['row']
    }
}