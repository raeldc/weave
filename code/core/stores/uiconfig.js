'use strict'

import Preview  from 'core/stores/layout.js'
import Controls from 'core/stores/controls.js'

let UIConfig = {
    Preview : Preview,
    Controls: Controls,
    toObject: function() {
        return {
            preview : Preview.toObject(),
            controls: Controls.toObject()
        }
    }
}

export default UIConfig