var Nodes       = require('core/stores/nodes.js'),
    Checks      = require('core/components/node/statics/checks.js'),
    NodeActions = require('core/actions/node.js');

module.exports = {
    draggingInside: function(subject, target) {
        var properties,
            node = Nodes.get(subject);

        if(Checks.canBeChild(subject, target) && Checks.nodeIsEmpty(target, ['placeholder', subject]) && target !== node.parent) {
            properties = _.clone(node);

            Nodes.deleteNode(subject);
            NodeActions.addChildNode(target, properties);
        }
    }
}