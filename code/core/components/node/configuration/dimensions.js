'use strict'

import Component from 'core/component.js'
import Nodes     from 'core/stores/nodes.js'

export default class Dimensions extends Component {
    initialState(props) {
        return Nodes.get(props.node)
    }

    render() {
        return <div><h5>Dimensions</h5></div>
    }
}