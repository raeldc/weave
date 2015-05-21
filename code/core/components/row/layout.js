'use strict'

// Components
import Component   from 'core/component.js'
import NodeLayout  from 'core/components/node/layout.js'

// Stores
import Nodes from 'core/stores/nodes.js'

// Actions
import NodeActions from 'core/actions/node.js'

// Behaviors
import Childable  from 'core/components/node/behaviors/childable.js'
import Draggable  from 'core/components/node/behaviors/draggable.js'
import GridSelect from 'core/components/column/behaviors/gridselect.js'
import Classable  from 'core/components/node/behaviors/classable.js'

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

export default class RowLayout extends NodeLayout {
    constructor(props, context) {
        super(props, context)

        this.addBehavior(Childable)

        Draggable.setDragResponder(this, 'draggingOnTop',    draggingOnTop)
        Draggable.setDragResponder(this, 'draggingOnBottom', draggingOnBottom)
        Draggable.setDragResponder(this, 'draggingInside',   draggingInside)
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
}