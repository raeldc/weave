'use strict'

import Component    from 'core/component.js'
import Layout       from 'core/ui/layout'
import LayoutStore  from 'core/stores/layout.js'
import Devices      from 'core/ui/controls/devices.js'
import ScreenLayout from 'core/ui/controls/screenlayout.js'
import UIComponents from 'core/ui/controls/components.js'
import Classable    from 'core/components/node/behaviors/classable.js'

export default class ThemeBuilderLayout extends Component {
    constructor(props, context) {
        super(props, context)
        this.addBehavior(Classable)
    }

    initialState() {
        return {
            screenLayout: LayoutStore.get('screenLayout') || 'full'
        }
    }

    beforeMount() {
        this.stopListeningToLayoutChange = LayoutStore.listen(this.onLayoutChange.bind(this))
    }

    beforeUnmount() {
        this.stopListeningToLayoutChange()
    }

    beforeRender() {
        Classable.addClass(this, this.state.screenLayout)
        Classable.addClass(this, 'container-fluid')
    }

    render() {
        return (
            <div {...this.getProperties()}>
                <div className="ui-controls-topbar">
                    <div className="ui-controls-devices">
                        <Devices />
                        <ScreenLayout className="pull-right" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <UIComponents />
                        <Layout />
                    </div>
                </div>
            </div>
        )
    }

    onLayoutChange() {
        this.setState(this.initialState())
    }
}