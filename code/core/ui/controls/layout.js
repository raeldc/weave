'use strict'

import Component     from 'core/component.js'
import LayoutActions from 'core/actions/layout.js'
import LayoutStore   from 'core/stores/layout.js'
import Classable     from 'core/components/node/behaviors/classable.js'

export default class LayoutControl extends Component {
    constructor(props, context) {
        super(props, context)
        this.addBehavior(Classable)
    }

    initialState() {
        return LayoutStore.toObject()
    }

    afterMount() {
        this.stopListeningToLayoutChange = LayoutStore.listen(this.onLayoutChange.bind(this))
    }

    beforeUnmount() {
        this.stopListeningToLayoutChange()
    }

    beforeRender() {
        Classable.addClass(this, 'btn-group')
        Classable.addClass(this, 'controls-layout')
        Classable.addClass(this, this.props.className)
    }

    render() {
        let buttons   = [],
            className = this.props.className ? ' ' + this.props.className : ''

        switch(this.state.screenLayout) {
            case 'minimized':
            case 'full':
                buttons.push(
                    <button className="btn btn-default btn-xs" onClick={this.setScreenLayout.bind(this, 'split')} key="split"><i className="fa fa-compress split"></i></button>
                )
            break
        }

        switch(this.state.screenLayout) {
            case 'split':
            case 'minimized':
                buttons.push(
                    <button className="btn btn-default btn-xs" onClick={this.setScreenLayout.bind(this, 'full')} key="full"><i className="fa fa-expand full"></i></button>
                )
            break
        }

        switch(this.state.screenLayout) {
            case 'split':
            case 'full':
                buttons.push(
                    <button className="btn btn-default btn-xs" onClick={this.setScreenLayout.bind(this, 'minimized')} key="minimized"><i className="fa fa-minus minimize"></i></button>
                )
            break
        }

        return  (
            <div {...this.getProperties()}>
                {buttons}
            </div>
        )
    }

    setScreenLayout(layout) {
        LayoutActions.setScreenLayout(layout)
    }

    onLayoutChange(layout) {
        this.setState(this.initialState())
    }
}
