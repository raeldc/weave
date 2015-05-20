'use strict'

import Component from 'core/component.js'
import Nodes     from 'core/stores/nodes.js'

export default class Formatting extends Component {
    initialState() {
        return Nodes.get(this.props.node)
    }

    render() {
        return <div><h5>Formatting</h5></div>
    }
}