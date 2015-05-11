var Nodes       = require('core/stores/nodes.js'),
    LayoutStore = require('core/stores/layout.js'),
    Checks      = require('core/components/node/statics/checks.js'),
    NodeActions = require('core/actions/node.js'),
    GridSelect  = require('core/components/column/mixins/gridselect.js');

function rowHasSpace(subject, target) {
    var properties, node, column, row, gridspace, colspan, device;

    node = Nodes.get(subject);

    if(node.component === 'column') {
        column  = Nodes.get(target);
        row     = Nodes.get(column.parent);
        device  = LayoutStore.get('device');
        colspan = Number(node.colspan[device]);

        gridspace = row.columns - GridSelect.calculateOccupiedColumns(row.id);

        // If dragging at the same row, add the columns's colspan to the space.
        if(row.id === node.parent) {
            gridspace += colspan;
        }

        if(gridspace >= colspan) {
            return true;
        }
    }

    return false;
}

module.exports = {
    draggingInside: function(subject, target) {
        var properties,
            node = Nodes.get(subject);

        if(Checks.canBeChild(subject, target) && Checks.nodeIsEmpty(target, ['placeholder', subject]) && target !== node.parent) {
            properties = _.clone(node);

            Nodes.deleteNode(subject);
            NodeActions.addChildNode(target, properties);

            return true;
        }

        return false;
    },

    draggingOnLeft: function(subject, target) {
        if(subject !== target && rowHasSpace(subject, target)) {
            Nodes.moveNodeBesideSibling(subject, target, 'before');
            return true;
        }

        return false;
    },

    draggingOnRight: function(subject, target) {
        if(subject !== target && rowHasSpace(subject, target)) {
            Nodes.moveNodeBesideSibling(subject, target, 'after');
            return true;
        }

        return false;
    }
}