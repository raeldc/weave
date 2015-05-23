'use strict'

import Component    from 'core/component.js'
import Layout       from 'core/ui/layout'
import Devices      from 'core/ui/controls/devices.js'
import UIComponents from 'core/ui/controls/components.js'

export default class ThemeBuilderLayout extends Component {
    render() {
        return (
            <div id="corebuilder-controls" className="container-fluid">
                <div className="ui-controls-topbar">
                    <div className="ui-controls-topbar-devices">
                        <Devices />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <UIComponents />
                        <div id="corebuilder-layout">
                            <Layout />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}