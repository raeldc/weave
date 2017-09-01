'use strict'

import Component from 'core/component.js'
import Devices   from 'core/ui/controls/devices.js'

export default class Topbar extends Component {
    render() {
        return  (
            <Devices className="devices" />
        )
    }
}