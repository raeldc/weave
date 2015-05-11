var Nodes       = require('core/stores/nodes.js'),
    Checks      = require('core/components/node/statics/checks.js'),
    RowChecks      = require('core/components/row/statics/checks.js'),
    NodeActions = require('core/actions/node.js');

module.exports = {
    draggingInside: function(subject, target) {
        var properties, column, row;

        column = Nodes.get(subject);
        row    = Nodes.get(target);

        if(column.component === 'column' && column.parent !== row.id && RowChecks.rowHasSpace(row.id, column.id)) {
            NodeActions.moveNodeToParent(column.id, row.id);
            return true;
        }

        return false;
    }
}