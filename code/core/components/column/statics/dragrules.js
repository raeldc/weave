var Nodes       = require('core/stores/nodes.js'),
    LayoutStore = require('core/stores/layout.js'),
    Checks      = require('core/components/node/statics/checks.js'),
    RowChecks   = require('core/components/row/statics/checks.js'),
    NodeActions = require('core/actions/node.js');

module.exports = {
    draggingInside: function(subject, target) {
        var properties,
            node = Nodes.get(subject);

        if(Checks.canBeChild(subject, target) && Checks.nodeIsEmpty(target, [subject]) && target !== node.parent) {
            properties = _.clone(node);

            Nodes.deleteNode(subject);
            NodeActions.addChildNode(target, properties);

            return true;
        }

        return false;
    },

    draggingOnLeft: function(subject, target) {
        var parent;

        subject = Nodes.get(subject);
        target  = Nodes.get(target);
        parent  = Nodes.get(target.parent);

        if(subject.component === 'column' && subject.id !== target.id && RowChecks.rowHasSpace(parent.id, subject.id)) {
            Nodes.moveNodeBesideSibling(subject.id, target.id, 'before');
            return true;
        }

        return false;
    },

    draggingOnRight: function(subject, target) {
        var parent;

        subject = Nodes.get(subject);
        target  = Nodes.get(target);
        parent  = Nodes.get(target.parent);

        if(subject.component === 'column' && subject.id !== target.id && RowChecks.rowHasSpace(parent.id, subject.id)) {
            Nodes.moveNodeBesideSibling(subject.id, target.id, 'after');
            return true;
        }

        return false;
    }
}