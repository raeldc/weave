import Nodes       from 'core/stores/nodes.js'
import NodeActions from 'core/actions/node.js'

export function rowHasSpace(row, column) {
    var gridspace, colspan

    row = Nodes.get(row || this.props.id)

    if(_.isObject(row)) {
        column    = Nodes.get(column)
        gridspace = row.columns - calculateOccupiedColumns(row.id)

        if(_.isObject(column)) {
            colspan = Number(column.colspan['desktop'])

            // If dragging at the same row, add the columns's colspan to the space.
            if(row.id === column.parent) {
                gridspace += colspan
            }
        }

        return gridspace >= colspan
    }

    return false
}

export function calculateOccupiedColumns(node, device) {
    var children = Nodes.get(node).children || [],
        device   = device || 'desktop',
        count    = 0

    if(device === 'desktop') {
        _.each(children, function(node) {
            count += Number(Nodes.getStore(node).getStore('colspan').get('desktop')) || 0
        })

        // Limit the the amount of columns in a row
        return count
    }

    return null
}

export function draggingInside(subject, target) {
    var column, row;

    column = Nodes.get(subject);
    row    = Nodes.get(target);

    if(column.component === 'column' && column.parent !== row.id && rowHasSpace(row.id, column.id)) {
        NodeActions.moveNodeToParent(column.id, row.id);
        return true;
    }

    return false;
}

export default {rowHasSpace, calculateOccupiedColumns, draggingInside}