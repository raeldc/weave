'use strict'

import Component     from 'core/component.js'
import Nodes         from 'core/stores/nodes.js'
import LayoutStore   from 'core/stores/layout.js'
import LayoutActions from 'core/actions/layout.js'
import NodeActions   from 'core/actions/node.js'
import Classable     from 'core/components/node/behaviors/classable.js'
import Eventable     from 'core/components/node/behaviors/eventable.js'
import Childable     from 'core/components/node/behaviors/childable.js'
import Changeable    from 'core/components/node/behaviors/changeable.js'
import GridSelect    from 'core/components/column/behaviors/gridselect.js'
import Droppable     from 'core/components/node/behaviors/droppable.js'
import Draggable     from 'core/components/node/behaviors/draggable.js'

// Import drag rules
import {draggingOnTop, draggingOnBottom}                       from 'core/components/node/behaviors/dragrules.js'
import {rowHasSpace, calculateOccupiedColumns, draggingInside} from 'core/components/row/behaviors/dragrules.js'

class ColumnSelect extends Component {
    constructor(props, context) {
        super(props, context)

        this.addBehavior(GridSelect)
    }

    initialState(props) {
        return {open: false}
    }

    render() {
        let open     = this.state.open ? ' open' : '',
            occupied = calculateOccupiedColumns(this.props.node, 'desktop'),
            columns  = Number(Nodes.get(this.props.node).columns),
            options  = _.map([2,3,4,6], value => {
                var disabled = (value < occupied) ? 'disabled' : null
                var selected = (value == columns) ? <i className="fa fa-check"></i> : ''
                var onClick  = !disabled ? () => {this.selectColumnsValue(value)} : null

                return <li className={disabled} key={value}><a href="#" onClick={onClick}>{value} {selected}</a></li>
            })

        return (
            <div className={"btn-group pull-right" + open}>
                <button type="button" className="btn btn-xs dropdown-toggle" onClick={() => {GridSelect.toggleOpen(this)}}>
                    Column Slots <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    {options}
                </ul>
            </div>
        )
    }

    selectColumnsValue(value) {
        NodeActions.updateColumns(this.props.node, value)
    }
}

export default class RowLayout extends Component {
    constructor(props, context) {
        super(props, context)

        this.addBehavior(Childable, Classable, Eventable, Changeable, Draggable, Droppable)

        Draggable.setDragResponder(this, 'draggingOnTop',    draggingOnTop)
        Draggable.setDragResponder(this, 'draggingOnBottom', draggingOnBottom)
        Draggable.setDragResponder(this, 'draggingInside',   draggingInside)
    }

    initialState() {
        return Nodes.get(this.props.id)
    }

    beforeMount() {
        Eventable.addEvent(this, 'onClick.selectable', event => {
            LayoutActions.selectNode(this.props.id)
            event.stopPropagation()
        })

        Eventable.addEvent(this, 'onMouseOver.hoverable', event => {
            LayoutActions.mouseOverNode(this.props.id)
            event.stopPropagation()
        })
    }

    beforeRender() {
        Classable.addClass(this, 'container-row')
        Classable.addClass(this, 'container-fluid')

        // We don't want to row class here coz we encapsulate the row
        Classable.removeClass(this, 'row')
    }

    render() {
        let Row = (
            <div className="row">
                <div className="controls col-lg-12">
                    <h4 className="title">
                        Row
                        <div className="btn-group pull-right">
                            <button className="btn btn-xs" onClick={this.addColumn}>
                                Add Column <i className="fa fa-plus"></i>
                            </button>
                            <button className="btn btn-xs" onClick={this.deleteNode}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                        <ColumnSelect node={this.props.id} />
                    </h4>
                </div>
                {Childable.createChildrenElements(this, {columns: this.state.columns})}
            </div>
        )

        return React.createElement('div', this.getProperties(), Row)
    }

    addColumn() {
        if(calculateOccupiedColumns(this.props.id) < this.state.columns) {
            NodeActions.addColumn(this.props.id)
        }
    }

    deleteNode() {
        NodeActions.deleteNode(this.props.id)
    }
}