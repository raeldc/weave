var Nodes       = require('core/stores/nodes.js'),
    LayoutStore = require('core/stores/layout.js'),
    Components  = require('core/stores/components.js'),
    NodeActions = require('core/actions/node.js');

function canBeSiblings(subject, target) {
    // Check if parent of target is an allowed parent of subject
    var subject = Nodes.get(subject),
        target  = Nodes.get(target),
        parent  = Nodes.get(target.parent),
        rules   = Components.get(subject.component).rules || {};

    if(_.isArray(rules.parents)) {
        // If the rules says the subject can have the target's parent
        return rules.parents.indexOf(parent.component) !== -1;
    }

    return false;
}

function canBeChild(subject, target) {
    // Check if parent of target is an allowed parent of subject
    var subject = Nodes.get(subject),
        target  = Nodes.get(target),
        rules   = Components.get(subject.component).rules || {};

    if(_.isArray(rules.parents)) {
        // If the rules says the subject can have the target's parent
        return rules.parents.indexOf(target.component) !== -1;
    }

    return false;
}

function isEmpty(subject, target) {
    var target = Nodes.get(target);
    var count  = 0;

    // Count all the children that is not a place holder
    _.each(target.children, function(id){
        if(id !== 'placeholder' && id !== subject) count++;
    });

    return !(count);
}

module.exports = {
    nodes: {
        draggingOnTop: function(subject, target) {
            if(canBeSiblings(subject, target)) {
                Nodes.moveNodeBesideSibling(subject, target, 'before');
            }
        },
        draggingOnBottom: function(subject, target) {
            if(canBeSiblings(subject, target)) {
                Nodes.moveNodeBesideSibling(subject, target, 'after');
            }
        }
    },
    columns: {
        draggingInside: function(subject, target) {
            var properties,
                node = Nodes.get(subject);

            if(canBeChild(subject, target) && isEmpty(subject, target) && target !== node.parent) {
                properties = _.clone(node);

                Nodes.deleteNode(subject);
                NodeActions.addChildNode(target, properties);
            }
        }
    },

    rows: {
        draggingOnTop: function(subject, target) {
            if(canBeSiblings(subject, target)) {
                Nodes.moveNodeBesideSibling(subject, target, 'before');
            }
        },
        draggingOnBottom: function(subject, target) {
            if(canBeSiblings(subject, target)) {
                Nodes.moveNodeBesideSibling(subject, target, 'after');
            }
        }
    }
}