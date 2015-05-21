'use strict'

import RootLayout    from 'core/components/root/layout'
import Stylable      from 'core/components/node/behaviors/stylable.js'
import Selectable    from 'core/components/node/behaviors/selectable.js'
import Hoverable     from 'core/components/node/behaviors/hoverable.js'

export default class RootNode extends RootLayout {
    constructor(props, context) {
        super(props, context)

        this.addBehavior(Stylable, Selectable, Hoverable)
    }

    beforeRender() {
        // Don't call the super method
    }

    render() {
        return React.createElement('div', 
            this.getProperties(),
            this.getChildren()
        )
    }
}