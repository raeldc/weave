import Node   from 'core/components/row/node.js'
import Layout from 'core/components/row/layout.js'

// Config UI
import Typography  from 'core/components/node/configuration/typography'
import Positioning from 'core/components/node/configuration/positioning.js'
import Dimensions  from 'core/components/node/configuration/dimensions.js'
import Box         from 'core/components/node/configuration/box'
import Background  from 'core/components/node/configuration/background.js'

export default {
    name       : 'row',
    title      : 'Row',
    description: '',
    iconClass  : '',
    node       : Node,
    layout     : Layout,
    defaults   : {
        element: 'div',
        columns: 4
    },
    configurations: [
        Background,
        Box
    ],
    rules: {
        parents: ['root', 'column']
    }
}
