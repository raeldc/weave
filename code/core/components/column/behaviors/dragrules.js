'use strict'

import Nodes       from 'core/stores/nodes.js'
import NodeActions from 'core/actions/node.js'

// Import drag rules
import {rowHasSpace}             from 'core/components/row/behaviors/dragrules.js'
import {canBeChild, nodeIsEmpty} from 'core/components/node/behaviors/dragrules.js'

export function draggingInside(subject, target) {
    let node   = Nodes.get(subject),
        column = Nodes.get(target);

    if(canBeChild(subject, target) && nodeIsEmpty(target, [subject]) && target !== node.parent) {
        NodeActions.moveNodeToParent(node.id, column.id);
        return true;
    }

    return false;
}

export function draggingOnLeft(subject, target) {
    let parent;

    subject = Nodes.get(subject);
    target  = Nodes.get(target);
    parent  = Nodes.get(target.parent);

    if(subject.component === 'column' && subject.id !== target.id && rowHasSpace(parent.id, subject.id)) {
        NodeActions.moveNodeBesideSibling(subject.id, target.id, 'before');
        return true;
    }

    return false;
}

export function draggingOnRight(subject, target) {
    let parent;

    subject = Nodes.get(subject);
    target  = Nodes.get(target);
    parent  = Nodes.get(target.parent);

    if(subject.component === 'column' && subject.id !== target.id && rowHasSpace(parent.id, subject.id)) {
        NodeActions.moveNodeBesideSibling(subject.id, target.id, 'after');
        return true;
    }

    return false;
}

export default {draggingInside, draggingOnLeft, draggingOnRight}