'use strict'

import Component from 'core/component.js'
import NodeLayout  from 'core/components/node/layout.js'

// Stores
import Nodes       from 'core/stores/nodes.js'
import LayoutStore from 'core/stores/layout.js'

// Actions
import LayoutActions from 'core/actions/layout.js'
import NodeActions   from 'core/actions/node.js'

// UI
import DeviceIcon from 'core/ui/elements/deviceicon.js'

// Behaviors
import Childable   from 'core/components/node/behaviors/childable.js'
import Classable   from 'core/components/node/behaviors/classable.js'
import Draggable   from 'core/components/node/behaviors/draggable.js'
import GridSelect  from 'core/components/column/behaviors/gridselect.js'
import Colspanable from 'core/components/column/behaviors/colspanable.js'

// Import Drag Checks
import {calculateOccupiedColumns} from 'core/components/row/behaviors/dragrules.js'

// Import Drag Rules
import {draggingInside, draggingOnLeft, draggingOnRight} from 'core/components/column/behaviors/dragrules.js'

class ColspanSelect extends Component {
    constructor(props, context) {
        super(props, context)

        this.addBehavior(GridSelect)
    }

    initialState(props) {
        return {open: false}
    }

    render() {
        let open     = this.state.open ? ' open' : '',
            node     = Nodes.get(this.props.node),
            device   = LayoutStore.get('device'),
            colspan  = Number(Nodes.getStore(this.props.node).getStore('colspan').get(device)),
            columns  = Number(Nodes.get(node.parent).columns),
            occupied = calculateOccupiedColumns(node.parent, device),
            options  = []

        for(let i = 1; i <= columns; i++) {
            options.push(i)
        }

        options = _.map(options, value => {
            let disabled = ((value + occupied) - colspan) > columns && occupied !== null ? 'disabled' : null
            let selected = (value == colspan) ? <i className="fa fa-check"></i>  : ''
            let onClick  = !disabled ? () => {this.selectColspanValue(value)} : null

            return <li className={disabled} key={value}><a href="#" onClick={onClick}>{value} {selected}</a></li>
        })

        return (
            <div className={"btn-group pull-right" + open}>
                <button type="button" className="btn btn-xs dropdown-toggle" onClick={() => {GridSelect.toggleOpen(this)}}>
                    Span <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    <li className="text-center"><DeviceIcon /></li>
                    <li className="divider" />
                    {options}
                </ul>
            </div>
        )
    }

    selectColspanValue(value) {
        NodeActions.updateColspan(this.props.node, value, LayoutStore.get('device'))
    }
}

export default class ColumnLayout extends NodeLayout {
    constructor(props, context) {
        super(props, context)

        this.addBehavior(Childable)

        Draggable.setDragResponder(this, 'draggingOnLeft',  draggingOnLeft)
        Draggable.setDragResponder(this, 'draggingOnRight', draggingOnRight)
        Draggable.setDragResponder(this, 'draggingInside',  draggingInside)

        // Remove the default responders from NodeLayout
        Draggable.setDragResponder(this, 'draggingOnTop',    null)
        Draggable.setDragResponder(this, 'draggingOnBottom', null)
    }

    beforeRender() {
        Classable.addClass(this, 'column');
        Classable.addClass(this, 'col-lg-' + Colspanable.getColspan(this))
    }

    render() {
        return React.createElement('div', this.getProperties(), this.renderColumn())
    }

    renderColumn() {
        return (
            <div className="inner">
                <div className="controls">
                    <h4 className="title">Column
                        <div className="btn-group pull-right">
                            <button className="btn btn-xs" onClick={() => {this.deleteNode(this.props.id)}}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                        <ColspanSelect node={this.props.id} />
                    </h4>
                </div>
                {this.getChildren()}
            </div>
        )
    }
}