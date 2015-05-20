'use strict'

import Component from 'core/component.js'
import Nodes     from 'core/stores/nodes.js'

export default class Alignment extends Component {
    initialState(props) {
        return Nodes.get(props.node)
    }

    render() {
        return <div><h5>Alignment</h5></div>
    }
}