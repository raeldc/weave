'use strict'

import Component   from 'core/component.js'
import LayoutStore from 'core/stores/layout.js'

export default class DeviceIcon extends Component {
    initialState() {
        return {device: LayoutStore.get('device')}
    }

    render() {
        var icon = this.state.device

        switch(this.state.device) {
            case 'phone':
                icon = 'mobile'
            break
        }

        return <i className={"fa fa-" + icon} />
    }

    afterMount() {
        this.stopListeningToDeviceChanges = LayoutStore.listen(this.updateIcon)
    }

    beforeUnmount() {
        this.stopListeningToDeviceChanges()
    }

    updateIcon(device) {
        this.setState(this.initialState())
    }
}