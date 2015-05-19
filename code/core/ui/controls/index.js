'use strict'

import TopBar     from 'core/ui/controls/topbar'
import Components from 'core/ui/controls/components'

export default class Controls extends React.Component {
    render() {
        return (
            <div id="corebuilder-controls" className="container-fluid">
                <TopBar />
                <div className="row">
                    <div className="col-lg-12">
                        <Components />
                        <div id="corebuilder-layout" />
                    </div>
                </div>
            </div>
        )
    }
}