'use strict'

import Component from 'core/component.js'
import Nodes     from 'core/stores/nodes.js'

export default class Positioning extends Component {
    initialState(props) {
        return Nodes.get(props.node)
    }

    render() {
        return <div><h5>Positioning</h5></div>
    }
}