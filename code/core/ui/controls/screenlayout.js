'use strict'

import Component     from 'core/component.js'
import LayoutActions from 'core/actions/layout.js'
import LayoutStore   from 'core/stores/layout.js'

export default class ScreenLayout extends Component {
    initialState() {
        return LayoutStore.toObject()
    }

    afterMount() {
        this.stopListeningToLayoutChange = LayoutStore.listen(this.onLayoutChange.bind(this))
    }

    beforeUnmount() {
        this.stopListeningToLayoutChange()
    }

    render() {
        let buttons   = [],
            className = this.props.className ? ' ' + this.props.className : ''

        switch(this.state.screenLayout) {
            case 'split':
            case 'full':
                buttons.push(
                    <button className="btn btn-default btn-xs" onClick={this.setScreenLayout.bind(this, 'hide')} key="hide"><i className="fa fa-toggle-down"></i></button>
                )
            break
        }

        switch(this.state.screenLayout) {
            case 'hide':
            case 'full':
                buttons.push(
                    <button className="btn btn-default btn-xs" onClick={this.setScreenLayout.bind(this, 'split')} key="split"><i className="fa fa-minus-square"></i></button>
                )
            break
        }

        switch(this.state.screenLayout) {
            case 'split':
            case 'hide':
                buttons.push(
                    <button className="btn btn-default btn-xs" onClick={this.setScreenLayout.bind(this, 'full')} key="full"><i className="fa fa-toggle-up"></i></button>
                )
            break
        }

        return  (
            <div className={"btn-group" + className}>
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