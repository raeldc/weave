import Node   from 'core/components/root/node.js'
import Layout from 'core/components/root/layout.js'

export default {
    name       : 'root',
    title      : 'Root',
    description: '',
    iconClass  : '',
    node       : Node,
    layout     : Layout,
    defaults   : {
        element: 'div',
        classes: 'container-fluid'
    },
    rules: {
        
    }
}