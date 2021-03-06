'use strict'

import Component    from 'core/component.js'
import Layout       from 'core/ui/layout'
import LayoutStore  from 'core/stores/layout.js'
import Devices      from 'core/ui/controls/devices.js'
import ScreenLayout from 'core/ui/controls/screenlayout.js'
import UIComponents from 'core/ui/controls/components.js'
import Eventable    from 'core/components/node/behaviors/eventable.js'
import Classable    from 'core/components/node/behaviors/classable.js'
import Resizable    from 'core/components/node/behaviors/resizable.js'

export default class ThemeBuilderLayout extends Component {
    constructor(props, context) {
        super(props, context)
        this.addBehavior(Eventable, Classable, Resizable)
        Resizable.setResizeHandle(this, 'top')
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

    beforeRender() {
        if(!this.state.height) {
            Classable.addClass(this, this.state.screenLayout)
        }

        Classable.addClass(this, 'container-fluid')
    }

    render() {
        return (
            <div {...this.getProperties()}>
                <div className="ui-controls-topbar">
                    <div className="ui-controls-toolbar">
                        <Devices className="devices" />
                        <ScreenLayout className="window-controls" />
                    </div>
                    <UIComponents />
                </div>
                <div className="wrapper">
                    <Layout />
                </div>
            </div>
        )
    }

    onLayoutChange() {
        this.setState(this.initialState())
    }

    setDimensions(dimensions) {
        
    }
}