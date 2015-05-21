'use strict'

import Component     from 'core/component.js'

// Stores
import Nodes         from 'core/stores/nodes.js'

// Actions
import NodeActions   from 'core/actions/node.js'
import LayoutActions from 'core/actions/layout.js'

// Behaviors
import Classable     from 'core/components/node/behaviors/classable.js'
import Eventable     from 'core/components/node/behaviors/eventable.js'
import Droppable     from 'core/components/node/behaviors/droppable.js'
import Changeable    from 'core/components/node/behaviors/changeable.js'
import Draggable     from 'core/components/node/behaviors/draggable.js'

// Drag Rules
import {draggingOnTop, draggingOnBottom} from 'core/components/node/behaviors/dragrules.js'

export default class NodeLayout extends Component {
    constructor(props, context) {
        super(props, context)

        this.addBehavior(Changeable, Classable, Eventable, Droppable, Draggable)

        Draggable.setDragResponder(this, 'draggingOnTop',  draggingOnTop)
        Draggable.setDragResponder(this, 'draggingOnBottom', draggingOnBottom)
    }

    initialState(props) {
        return Nodes.get(props.id)
    }

    beforeMount() {
        Eventable.addEvent(this, 'onClick.selectable', function(event) {
            LayoutActions.selectNode(this.props.id)
            event.stopPropagation()
        })

        Eventable.addEvent(this, 'onMouseOver.hoverable', function(event) {
            LayoutActions.mouseOverNode(this.props.id)
            event.stopPropagation()
        })
    }

    beforeRender() {
        Classable.addClass(this, 'content')
    }

    render() {
        var Controls = (
            <div className="controls">
                <h5 className="title">
                    {this.state.text || "Empty Text"}
                    <div className="btn-group pull-right">
                        <button className="btn btn-xs" onClick={() => {this.deleteNode(this.props.id)}}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </h5>
            </div>
        )

        return React.createElement('div', this.getProperties(), Controls)
    }

    deleteNode(id) {
        NodeActions.deleteNode(id)
    }
}