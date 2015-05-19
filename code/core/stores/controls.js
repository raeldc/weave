'use strict'

import Store             from 'core/stores'
import UIControlsActions from 'core/actions/controls.js'

let Controls = (new Store({active_section: 'edit'})).setActions(UIControlsActions, {

})

export default Controls