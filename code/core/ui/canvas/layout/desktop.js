'use strict'

import Component     from 'core/component.js'
import Layout        from 'core/ui/canvas/layout'
import LayoutStore   from 'core/stores/layout.js'
import Devices       from 'core/ui/controls/devices.js'
import LayoutControl from 'core/ui/controls/layout.js'
import UIComponents  from 'core/ui/controls/components.js'
import Eventable     from 'core/components/node/behaviors/eventable.js'
import Classable     from 'core/components/node/behaviors/classable.js'

export default class DesktopLayout extends Component {
    constructor(props, context) {
        super(props, context)
        this.addBehavior(Eventable, Classable)
    }

    initialState() {
        return {
            screenLayout: LayoutStore.get('screenLayout') || 'full',
            height      : null
        }
    }

    beforeMount() {
        this.stopListeningToLayoutChange = LayoutStore.listen(this.onLayoutChange.bind(this))
    }

    beforeUnmount() {
        this.stopListeningToLayoutChange()
    }

    render() {
        return (
            <div className="ui-layout-container" {...this.getProperties()}>
                <LayoutControl />
                <Layout />
            </div>
        )
    }

    onLayoutChange() {
        this.setState(this.initialState())
    }

    setDimensions(dimensions) {

    }
}
