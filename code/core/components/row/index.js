import Node   from 'core/components/node/node.js'
import Layout from 'core/components/row/layout.js'

export default {
    name       : 'row',
    title      : 'Row',
    description: '',
    iconClass  : '',
    node       : Node,
    layout     : Layout,
    defaults   : {
        element: 'div',
        columns: 4,
        classes: ['row']
    },
    rules: {
        parents: ['root', 'column']
    }
}