'use strict'

import Nodes         from 'core/stores/nodes.js'
import LayoutActions from 'core/actions/layout.js'
import LayoutStore   from 'core/stores/layout.js'
import Eventable     from 'core/components/node/behaviors/eventable.js'

// Get Utility functions for getting info about the component
import {getNodeInfo, resetNodeInfo, getCursorPosition} from 'core/components/node/utilities/nodeinfo.js'

function beforeMount(component) {
    registerEvents(component)
}

function beforeUpdate(component) {
    registerEvents(component)
}

function registerEvents(component) {
    Eventable.addEvent(component, 'onMouseOver.droppable', event => {getNodeInfo(component, event)})
    Eventable.addEvent(component, 'onDragEnter.droppable', event => {getNodeInfo(component, event)})

    Eventable.addEvent(component, 'onMouseMove.droppable', event => {executeDraggingRules(component, event)})
    Eventable.addEvent(component, 'onDragOver.droppable',  event => {executeDraggingRules(component, event)})

    Eventable.addEvent(component, 'onMouseOut.droppable',  event => {resetNodeInfo(component, event)})
    Eventable.addEvent(component, 'onDragLeave.droppable', event => {resetNodeInfo(component, event)})

    // This only works when an new component from the Components Pane is dropped
    Eventable.addEvent(component, 'onDrop.droppable',  event => {
        if(LayoutStore.get('drag_subject') === component.props.id){
            Nodes.getStore(component.props.id).remove('unmounted')
            LayoutActions.stopDrag()
        }

        event.stopPropagation()
    })
}

/**
 * This detects if mouse is moving inside the element
 *
 * It checks if there is a drag subject
 *     then it fires events according to the cursor position
 *
 * Fires 
 *     draggingOnTop, 
 *     draggingOnRight, 
 *     draggingOnBottom, 
 *     draggingOnLeft, 
 *     draggingInside
 *     
 * @param  {object} event The event object
 * @return {null}       Returns nothing
 */
function executeDraggingRules(component, event) {
    var subject = LayoutStore.get('drag_subject') || false

    if(subject) {
        let position = getCursorPosition(component, event)

        if(
            component.cursorPosition !== 'top' &&
            typeof component.draggingOnTop === 'function' && 
            position.top && 
            component.draggingOnTop(subject, component.props.id)
        ) 
            component.cursorPosition = 'top'
        else if(
            component.cursorPosition !== 'right' &&
            typeof component.draggingOnRight === 'function' && 
            position.right && 
            component.draggingOnRight(subject, component.props.id)
        )
            component.cursorPosition = 'right'
        else if(
            component.cursorPosition !== 'bottom' && 
            typeof component.draggingOnBottom === 'function' && 
            position.bottom && 
            component.draggingOnBottom(subject, component.props.id)
        )
            component.cursorPosition = 'bottom'
        else if(
            component.cursorPosition !== 'left' &&
            typeof component.draggingOnLeft === 'function' &&
            position.left &&
            component.draggingOnLeft(subject, component.props.id)
        )
            component.cursorPosition = 'left'
        else if(
            component.cursorPosition !== 'inside' &&
            typeof component.draggingInside === 'function' &&
            position.inside &&
            component.draggingInside(subject, component.props.id)
        )
            component.cursorPosition = 'inside'

        // If subject is being dragged in its placeholder, allow the drop.
        if(subject === component.props.id) {
            event.preventDefault()
        }
    }

    event.stopPropagation()
}

export default {beforeMount, beforeUpdate}