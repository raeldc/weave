'use strict'

import React      from 'react'
import Reflux     from 'reflux'
import Nodes      from 'core/stores/nodes.js'
import Components from 'core/stores/components.js'
import UIConfig   from 'core/stores/uiconfig.js'

// Declare global variables
window.React       = React
window.Reflux      = Reflux
window.CoreBuilder = {
    Nodes     : Nodes,
    Comopnents: Components,
    UIConfig  : UIConfig
}

export default window.CoreBuilder