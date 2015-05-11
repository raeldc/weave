var Nodes       = require('core/stores/nodes.js'),
    LayoutStore = require('core/stores/layout.js'),
    Checks      = require('core/components/row/statics/checks.js');

function rowHasSpace(row, column) {
    var gridspace, colspan, device;

    row = Nodes.get(row || this.props.id);

    if(_.isObject(row)) {
        column    = Nodes.get(column);
        gridspace = row.columns - calculateOccupiedColumns(row.id);

        if(_.isObject(column)) {

            device  = LayoutStore.get('device');
            colspan = Number(column.colspan[device]);

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
        device   = device || LayoutStore.get('device'),
        count    = 0;

    if(device === 'desktop') {
        _.each(children, function(node) {
            count += Number(Nodes.getStore(node).getStore('colspan').get(device)) || 0;
        });

        return count;
    }

    return null;
}

module.exports = {
    rowHasSpace             : rowHasSpace,
    calculateOccupiedColumns: calculateOccupiedColumns
}