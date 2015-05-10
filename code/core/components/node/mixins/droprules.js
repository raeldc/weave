var Nodes       = require('core/stores/nodes.js'),
    LayoutStore = require('core/stores/layout.js'),
    Components  = require('core/stores/components.js');

function insertPlaceholder(target, position) {
    Nodes.deleteNode('placeholder');

    Nodes.insertNodeBesideSibling({
        id       : 'placeholder',
        component: 'placeholder',
        position : position,
        sibling  : target
    }, target, position || 'before');

    LayoutStore.set('drop_subject',  target);
    LayoutStore.set('drop_position', position);
}

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

}

module.exports = {
    nodes: {
        draggingOnTop: function(subject, target) {
            if(canBeSiblings(subject, target)) {
                insertPlaceholder(target, 'before');
            }
        },
        draggingOnBottom: function(subject, target) {
            if(canBeSiblings(subject, target)) {
                insertPlaceholder(target, 'after');
            }
        }
    },
    columns: {
        
    },

    rows: {
        draggingOnTop: function(subject, target) {
            if(canBeSiblings(subject, target)) {
                insertPlaceholder(target, 'before');
            }
        },
        draggingOnBottom: function(subject, target) {
            if(canBeSiblings(subject, target)) {
                insertPlaceholder(target, 'after');
            }
        }
    }
}