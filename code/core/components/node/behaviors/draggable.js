'use strict'

import LayoutStore   from 'core/stores/layout.js'
import LayoutActions from 'core/actions/layout.js'
import Eventable     from 'core/components/node/behaviors/eventable.js'
import Classable     from 'core/components/node/behaviors/classable.js'

function beforeMount(component) {        
    Eventable.addEvent(component, 'onDragStart.movable', event => {onDragStart(component, event)})

    // self.
    addClasses(component)
}

function beforeUpdate(component) {
    // self.
    addClasses(component)
}

function beforeUnmount(component) {
    if(component.stopListeningToStopDrag) {
        component.stopListeningToStopDrag()
    }
}

function beforeRender(component) {
    component.setProperty('draggable', true)
}

function addClasses(component) {
    if(LayoutStore.get('drag_subject') === component.props.id) {
        // self.
        listenToStopDrag(component)

        Classable.addClass(component, 'drag-subject')
        if(component.state.unmounted) {
            Classable.addClass(component, 'unmounted')
        }
    }
    else Classable.removeClass(component, 'drag-subject')
}

function listenToStopDrag(component) {
    if(component.stopListeningToStopDrag) {
        component.stopListeningToStopDrag()
    }

    component.stopListeningToStopDrag = LayoutActions.stopDrag.listen(event => {show(component)})
}

function show(component) {
    if(component.stopListeningToStopDrag) {
        component.stopListeningToStopDrag()
    }

    Classable.removeClass(component, 'drag-subject')
    component.forceUpdate()
}

function hide(component) {
    Classable.addClass(component, 'drag-subject')
    component.forceUpdate()
}

/**
 * onDragStart: Start an artificial Drag&Drop Sequence
 *     LayoutActions.startDrag(this.props.id, this)
 *     DragContainer renders the current node as child
 *         Gets its size
 *         Gets its position
 *         Tilt a little bit
 *         Then Follow the Mouse
 *     Droppable Nodes have mouseOver event
 *         onMouseOver, if a node is being dragged
 *             fire draggingOnTop, draggingOnRight, draggingOnBottom, draggingOnLeft, draggingInside
 *         onMouseOut, remove Dragging Event
 *         onMouseUp
 *             get the dragging Event
 *             insert node based on dragging event
 *     End the drag event right away
 *
 * onMouseUp: End the artificial Drag&Drop Sequence
 */
function onDragStart(component, event) {
    LayoutActions.startDrag(component.props.id, component, event)

    //Register mouseUp event on Window
    jQuery(window).on('mouseup.movable', function() {
        jQuery(window).unbind('mouseup.movable')
        LayoutActions.stopDrag()
    })

    event.stopPropagation()
    event.preventDefault()

    // self.
    hide(component)
}

export function setDragResponder(component, type, callback) {
    if(typeof callback === 'function') {
        component[type] = callback.bind(component)
    }
}

export default {beforeMount, beforeUpdate, beforeUnmount, beforeRender, setDragResponder}