'use strict'

import LayoutStore from 'core/stores/layout.js'

export default class DeviceIcon extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = this.initialState()
    }

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

    componentDidMount() {
        this.stopListeningToDeviceChanges = LayoutStore.listen(this.updateIcon)
    }

    componentWillUnmount() {
        this.stopListeningToDeviceChanges()
    }

    updateIcon(device) {
        this.setState(this.initialState())
    }
}