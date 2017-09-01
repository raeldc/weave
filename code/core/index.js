'use strict'

import Utilities       from 'core/utilities.js'
import React           from 'react'
import ReactDOM        from 'react-dom'
import Reflux          from 'reflux'
import Nodes           from 'core/stores/nodes.js'
import UIConfig        from 'core/stores/uiconfig.js'
import * as Components from 'core/stores/components.js'
import Styling         from 'core/stores/styling.js'

var core = {
    React      : React,
    ReactDOM   : ReactDOM,
    Reflux     : Reflux,
    CoreBuilder: {
        Nodes     : Nodes,
        Components: Components,
        UIConfig  : UIConfig,
        Styling   : Styling
    }
}

if(typeof global === 'object') {
    _.extend(global, core)
}else {
    _.extend(window, core)
}

// Rename CoreBuilder to Weave
export default core.CoreBuilder