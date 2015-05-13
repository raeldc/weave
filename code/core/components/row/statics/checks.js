var Nodes       = require('core/stores/nodes.js'),
    LayoutStore = require('core/stores/layout.js'),
    Checks      = require('core/components/row/statics/checks.js');

function rowHasSpace(row, column) {
    var gridspace, colspan;

    row = Nodes.get(row || this.props.id);

    if(_.isObject(row)) {
        column    = Nodes.get(column);
        gridspace = row.columns - calculateOccupiedColumns(row.id);

        if(_.isObject(column)) {
            colspan = Number(column.colspan['desktop']);

            // If dragging at the same row, add the columns's colspan to the space.
            if(row.id === column.parent) {
                gridspace += colspan;
            }
        }

        return gridspace >= colspan;
    }

    return false;
}

function calculateOccupiedColumns(node, device) {
    var children = Nodes.get(node).children || [],
        device   = device || 'desktop',
        count    = 0;

    if(device === 'desktop') {
        _.each(children, function(node) {
            count += Number(Nodes.getStore(node).getStore('colspan').get('desktop')) || 0;
        });

        // Limit the the amount of columns in a row
        // return count;
        // Unlimited Columns in a Row.
        return null;
    }

    return null;
}

module.exports = {
    rowHasSpace             : rowHasSpace,
    calculateOccupiedColumns: calculateOccupiedColumns
}