'use strict'

import Component  from 'core/component.js'
import Nodes      from 'core/stores/nodes.js'
import Childable  from 'core/components/node/behaviors/childable.js'
import Changeable from 'core/components/node/behaviors/changeable.js'
import Eventable  from 'core/components/node/behaviors/eventable.js'
import Editable   from 'core/components/node/behaviors/editable.js'
import Stylable   from 'core/components/node/behaviors/stylable.js'
import Classable  from 'core/components/node/behaviors/classable.js'
import Selectable from 'core/components/node/behaviors/selectable.js'
import Hoverable  from 'core/components/node/behaviors/hoverable.js'

export default class Node extends Component {
    constructor(props, context) {
        super(props, context)

        this.addBehavior(Eventable, Changeable, Editable, Stylable, Classable, Selectable, Hoverable)
    }

    initialState(props) {
        return Nodes.get(props.id);
    }

    render() {
        return React.createElement(
            this.state.element || 'div', 
            this.getProperties(),
            this.getChildren()
        )
    }
}