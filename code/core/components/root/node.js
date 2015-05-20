'use strict'

import Component     from 'core/component.js'
import Nodes         from 'core/stores/nodes.js'
import LayoutStore   from 'core/stores/layout.js'
import LayoutActions from 'core/actions/layout.js'
import Childable     from 'core/components/node/behaviors/childable.js'
import Changeable    from 'core/components/node/behaviors/changeable.js'
import Eventable     from 'core/components/node/behaviors/eventable.js'
import Stylable      from 'core/components/node/behaviors/stylable.js'
import Classable     from 'core/components/node/behaviors/classable.js'
import Colspanable   from 'core/components/column/behaviors/colspanable.js'
import Selectable    from 'core/components/node/behaviors/selectable.js'
import Hoverable     from 'core/components/node/behaviors/hoverable.js'

export default class RootNode extends Component {
    constructor(props, context) {
        super(props, context)

        this.addBehavior(Childable, Eventable, Changeable, Stylable, Classable, Selectable, Hoverable)
    }

    initialState(props) {
        return Nodes.get(props.id)
    }

    beforeMount() {
        Eventable.addEvent(this, 'onMouseOut', function() {
            LayoutActions.mouseOutNode()
        })
    }

    render() {
        return React.createElement('div', 
            this.getProperties(),
            this.getChildren()
        )
    }
}