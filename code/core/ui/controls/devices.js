'use strict'

import Component      from 'core/component.js'
import PreviewActions from 'core/actions/layout.js'
import Config         from 'core/stores/uiconfig.js'

export default class Devices extends Component {
    initialState() {
        return Config.Preview.toObject()
    }

    render() {
        let desktop = this.state.device === 'desktop' ? ' active' : '',
            laptop  = this.state.device === 'laptop'  ? ' active' : '',
            tablet  = this.state.device === 'tablet'  ? ' active' : '',
            phone   = this.state.device === 'phone'   ? ' active' : ''

        return  (
            <div className={"btn-group " +  this.props.className}>
                <button className={"btn btn-default btn-xs" + desktop} onClick={this.setDevice.bind(this, 'desktop')}><i className="fa fa-desktop"></i></button>
                <button className={"btn btn-default btn-xs" + laptop}  onClick={this.setDevice.bind(this, 'laptop')}><i className="fa fa-laptop"></i></button>
                <button className={"btn btn-default btn-xs" + tablet}  onClick={this.setDevice.bind(this, 'tablet')}><i className="fa fa-tablet"></i></button>
                <button className={"btn btn-default btn-xs" + phone}   onClick={this.setDevice.bind(this, 'phone')}><i className="fa fa-mobile"></i></button>
            </div>
        )
    }

    setDevice(device) {
        PreviewActions.setDevice(device)
    }

    onDeviceChange(node){
        this.setState(this.initialState())
    }

    shouldUpdate(nextProps, nextState) {
        // Update only when the selected node is different from the previous one
        return this.state.device !== nextState.device
    }

    afterMount() {
        this.stopListeningToDeviceChange = Config.Preview.listen(this.onDeviceChange.bind(this))
    }

    beforeUnmount() {
        this.stopListeningToDeviceChange()
    }
}