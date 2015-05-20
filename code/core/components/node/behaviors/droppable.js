'use strict'

import Nodes         from 'core/stores/nodes.js'
import LayoutActions from 'core/actions/layout.js'
import LayoutStore   from 'core/stores/layout.js'
import Eventable     from 'core/components/node/behaviors/eventable.js'

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
        if(
            component.cursorPosition !== 'top' &&
            typeof component.draggingOnTop === 'function' && 
            isDraggingOnArea(component, event, 'top') && 
            component.draggingOnTop(subject, component.props.id)
        ) 
            component.cursorPosition = 'top'
        else if(
            component.cursorPosition !== 'right' &&
            typeof component.draggingOnRight === 'function' && 
            isDraggingOnArea(component, event, 'right') && 
            component.draggingOnRight(subject, component.props.id)
        )
            component.cursorPosition = 'right'
        else if(
            component.cursorPosition !== 'bottom' && 
            typeof component.draggingOnBottom === 'function' && 
            isDraggingOnArea(component, event, 'bottom') && 
            component.draggingOnBottom(subject, component.props.id)
        )
            component.cursorPosition = 'bottom'
        else if(
            component.cursorPosition !== 'left' &&
            typeof component.draggingOnLeft === 'function' &&
            isDraggingOnArea(component, event, 'left') &&
            component.draggingOnLeft(subject, component.props.id)
        )
            component.cursorPosition = 'left'
        else if(
            component.cursorPosition !== 'inside' &&
            typeof component.draggingInside === 'function' &&
            isDraggingOnArea(component, event, 'inside') &&
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

function isDraggingOnArea(component, event, area) {
    if(component.nodeInfo) {
        switch(area) {
            case 'top':
                return event.clientY < (component.nodeInfo.top + (component.nodeInfo.height * .5))
            break
            case 'right':
                return event.clientX > component.nodeInfo.left + (component.nodeInfo.width - (component.nodeInfo.width * .5))
            break
            case 'bottom':
                return event.clientY > (component.nodeInfo.top + (component.nodeInfo.height - (component.nodeInfo.height * .5)))
            break
            case 'left':
                return  event.clientX < component.nodeInfo.left + (component.nodeInfo.width * .5)
            break
            case 'inside':
                return (event.clientX <= component.nodeInfo.left + component.nodeInfo.width) && (event.clientY <= component.nodeInfo.top + component.nodeInfo.height)
            break
        }
    }

    return false
}

export function resetNodeInfo(component) {
    component.nodeInfo       = undefined
    component.cursorPosition = undefined
}

export function getNodeInfo(component) {
    var $target, nodeOffset

    if(LayoutStore.get('drag_subject')) {
        $target    = jQuery(React.findDOMNode(component)),
        nodeOffset = $target.offset()

        component.nodeInfo = {
            width : $target.outerWidth(),
            height: $target.outerHeight(),
            top   : nodeOffset.top - jQuery(window).scrollTop(),
            left  : nodeOffset.left
        }

        return component.nodeInfo
    }
}

export default {beforeMount, beforeUpdate}