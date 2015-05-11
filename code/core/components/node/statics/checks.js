var Nodes      = require('core/stores/nodes.js'),
    Components = require('core/stores/components.js');

module.exports = {
    canBeSiblings: function(subject, target) {
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
    },

    canBeChild: function(subject, target) {
        // Check if parent of target is an allowed parent of subject
        var subject = Nodes.get(subject),
            target  = Nodes.get(target),
            rules   = Components.get(subject.component).rules || {};

        if(_.isArray(rules.parents)) {
            // If the rules says the subject can have the target's parent
            return rules.parents.indexOf(target.component) !== -1;
        }

        return false;
    },

    nodeIsEmpty: function(target, dontCount) {
        var target    = Nodes.get(target);
        var dontCount = dontCount || ['placeholder']
        var count     = 0;

        // Count all the children that is not a place holder
        _.each(target.children, function(id){
            if(dontCount.indexOf(id) === -1) count++;
        });

        return !(count);
    }
}