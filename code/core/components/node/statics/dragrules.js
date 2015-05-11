var Nodes  = require('core/stores/nodes.js'),
    Checks = require('core/components/node/statics/checks.js');

module.exports = {
    draggingOnTop: function(subject, target) {
        if(Checks.canBeSiblings(subject, target)) {
            Nodes.moveNodeBesideSibling(subject, target, 'before');
            return true;
        }

        return false;
    },
    draggingOnBottom: function(subject, target) {
        if(Checks.canBeSiblings(subject, target)) {
            Nodes.moveNodeBesideSibling(subject, target, 'after');
            return true;
        }

        return false;
    }
}