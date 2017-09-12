'use strict'

import Component     from 'core/component.js'
import LayoutActions from 'core/actions/layout.js'
import Config        from 'core/stores/uiconfig.js'
import Classable     from 'core/components/node/behaviors/classable.js'

export default class Devices extends Component {
    constructor(props, context) {
        super(props, context)
        this.addBehavior(Classable)
    }

    initialState() {
        return Config.Preview.toObject()
    }

    beforeRender() {
        Classable.addClass(this, 'btn-group')
        Classable.addClass(this, 'controls-devices')
        Classable.addClass(this, this.props.className)
    }

    render() {
        let desktop = this.state.device === 'desktop' ? ' active' : '',
            laptop  = this.state.device === 'laptop'  ? ' active' : '',
            tablet  = this.state.device === 'tablet'  ? ' active' : '',
            phone   = this.state.device === 'phone'   ? ' active' : ''

        return  (
            <div {...this.getProperties()}>
                <button className={"btn btn-default btn-xs" + desktop} onClick={this.setDevice.bind(this, 'desktop')}><i className="fa fa-desktop"></i></button>
                <button className={"btn btn-default btn-xs" + laptop}  onClick={this.setDevice.bind(this, 'laptop')}><i className="fa fa-laptop"></i></button>
                <button className={"btn btn-default btn-xs" + tablet}  onClick={this.setDevice.bind(this, 'tablet')}><i className="fa fa-tablet"></i></button>
                <button className={"btn btn-default btn-xs" + phone}   onClick={this.setDevice.bind(this, 'phone')}><i className="fa fa-mobile"></i></button>
            </div>
        )
    }

    setDevice(device) {
        LayoutActions.setDevice(device)
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
