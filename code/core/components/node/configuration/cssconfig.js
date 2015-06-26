'use strict'

import Component       from 'core/component.js'
import {onChangeStyle} from 'core/actions/styling.js'

export default class CSSConfig extends Component {
    initialState(props) {
        return {}
    }

    afterMount() {
        this.stopListeningToStylingChanges = onChangeStyle(() => {this.update()})
    }

    beforeUnmount() {
        this.stopListeningToStylingChanges()
    }

    update() {
        this.forceUpdate()
    }
}
