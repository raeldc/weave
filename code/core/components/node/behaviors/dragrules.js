import Nodes       from 'core/stores/nodes.js'
import NodeActions from 'core/actions/node.js'
import Components  from 'core/stores/components.js'

export function draggingOnTop(subject, target) {
    if(canBeSiblings(subject, target)) {
        NodeActions.moveNodeBesideSibling(subject, target, 'before')
        return true
    }

    return false
}

export function draggingOnBottom(subject, target) {
    if(canBeSiblings(subject, target)) {
        NodeActions.moveNodeBesideSibling(subject, target, 'after')
        return true
    }

    return false
}

export function canBeSiblings(subject, target) {
    // Check if parent of target is an allowed parent of subject
    subject = Nodes.get(subject)
    target  = Nodes.get(target)

    let parent = Nodes.get(target.parent),
        rules  = Components.get(subject.component).rules || {}

    if(_.isArray(rules.parents)) {
        // If the rules says the subject can have the target's parent
        return rules.parents.indexOf(parent.component) !== -1
    }

    return false
}

export function canBeChild(subject, target) {
    // Check if parent of target is an allowed parent of subject
    subject = Nodes.get(subject)
    target  = Nodes.get(target)

    let rules = Components.get(subject.component).rules || {}

    if(_.isArray(rules.parents)) {
        // If the rules says the subject can have the target's parent
        return rules.parents.indexOf(target.component) !== -1
    }

    return false
}

export function nodeIsEmpty(target, dontCount) {
    var target    = Nodes.get(target)
    var dontCount = dontCount || ['placeholder']
    var count     = 0

    // Count all the children that is not a place holder
    _.each(target.children, function(id){
        if(dontCount.indexOf(id) === -1) count++
    })

    return !(count)
}

export default {draggingOnTop, draggingOnBottom, canBeSiblings, canBeChild, nodeIsEmpty}