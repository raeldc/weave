'use strict'

import React           from 'react'
import ReactDOM        from 'react-dom'
import Reflux          from 'reflux'
import Nodes           from 'core/stores/nodes.js'
import UIConfig        from 'core/stores/uiconfig.js'
import * as Components from 'core/stores/components.js'
import Styling         from 'core/stores/styling.js'

// Declare global variables
window.React       = React
window.ReactDOM    = ReactDOM
window.Reflux      = Reflux
window.CoreBuilder = {
    Nodes     : Nodes,
    Components: Components,
    UIConfig  : UIConfig,
    Styling   : Styling
}

export default window.CoreBuilder
