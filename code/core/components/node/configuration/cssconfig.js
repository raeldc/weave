'use strict'

import Component from 'core/component.js'

// Stores
import Nodes from 'core/stores/nodes.js'

// Actions
import UINodeActions from 'core/actions/node.js'

export default class CSSConfig extends Component {
    initialState(props) {
        return Nodes.getStore(props.node).getStore('css').get(props.device)
    }

    afterMount() {
        this.stopListeningToCSSChanges = Nodes.getStore(this.props.node).getStore('css').listen(this.update.bind(this))
    }

    afterUpdate() {
        this.stopListeningToCSSChanges()
        this.afterMount()
    }

    beforeUnmount() {
        this.stopListeningToCSSChanges();
    }

    newProps(component, nextProps) {
        this.state = this.initialState(nextProps)
        this.forceUpdate()
    }

    render() {
        
    }

    update() {
        this.state = this.initialState(this.props)
        this.forceUpdate()
    }
}
