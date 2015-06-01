'use strict'

import Component     from 'core/component.js'
import Eventable     from 'core/components/node/behaviors/eventable.js'
import LayoutActions from 'core/actions/layout.js'

// Get Utility functions for getting info about the component
import {getNodeInfo, resetNodeInfo, getCursorPosition} from 'core/components/node/utilities/nodeinfo.js'

/**
 * Just make this as a behavior of a component, and we have a resizable element
 *     It detects if the cursor is on the edge of the element, and changes the cursor css property
 *     while the cursor is on the area. So for example, the cursor is on top edge, the behavior
 *     will set the state of the component to rerender it, so it can change the cursor css property.
 *
 *     It also detects where the cursor is on mousedown, so while on mousedown, moving the mouse around
 *     will trigger the resize of the component.
 */
function beforeMount(component) {
    registerEvents(component)
}

function beforeUpdate(component) {
    registerEvents(component)
}

function registerEvents(component) {
    Eventable.addEvent(component, 'onMouseOver.resizable', event => {getNodeInfo(component, event)})
    Eventable.addEvent(component, 'onMouseOut.resizable',  event => {checkMouseOut(component, event)})
    Eventable.addEvent(component, 'onMouseMove.resizable', event => {renderResizeHandles(component, event)})
    Eventable.addEvent(component, 'onMouseDown.resizable', event => {startResize(component, event)})
}

function beforeRender(component) {
    let style        = component.getProperty('style') || {}
        style.cursor = null

    if(component.state.resizeTop || component.state.resizeBottom) {
        style.cursor = 'ns-resize'
    }else if(component.state.resizeRight || component.state.resizeLeft) {
        style.cursor = 'ew-resize'
    }

    if(component.state.height) {
        style.height     = component.state.height
        style.transition = 'none'
    }

    component.setProperty('style', style)
}

/**
 * We detect where the mouse is so the component knows what mouse cursor to use
 * 
 * @param  {React.Component} component The subject component
 * @param  {event} event     HTML Event Object
 */
function renderResizeHandles(component, event) {
    let position = getCursorPosition(component, event, 5), 
        state    = {
            resizeTop   : position.top    && component.resizable.handles.indexOf('top')   !== -1,
            resizeRight : position.right  && component.resizable.handles.indexOf('right') !== -1,
            resizeLeft  : position.left   && component.resizable.handles.indexOf('left')  !== -1,
            resizeBottom: position.bottom && component.resizable.handles.indexOf('top')   !== -1,
        }

    // Don't set the state if the current state is just the same
    if(
        component.state.resizeTop    !== state.resizeTop    || 
        component.state.resizeRight  !== state.resizeRight  || 
        component.state.resizeBottom !== state.resizeBottom || 
        component.state.resizeLeft   !== state.resizeLeft
    ) {
        component.setState(state)
    }
}

function checkMouseOut(component, event) {
    let position = getCursorPosition(component, event)

    // Don't reset the state if mouse is still insde
    // Mouseout is triggered because it hovered on child elements
    //  thus the need to check if cursor is inside our outside 
    //  when mouseout is triggered
    if(!position.inside) {
        component.setState({
            resizeTop   : false,
            resizeRight : false,
            resizeLeft  : false,
            resizeBottom: false,
        })

        resetNodeInfo(component, event)
    }
}

function startResize(component, event) {
    var startX = Number(event.clientX),
        startY = Number(event.clientY)

    // Resize only if state is on resize Mode
    if(
        component.state.resizeTop    || 
        component.state.resizeRight  || 
        component.state.resizeBottom || 
        component.state.resizeLeft   
    ) {
        let dimensions = {
            height: component.nodeInfo.height,
            width : component.nodeInfo.width
        }

        // Get the node info on startResize
        getNodeInfo(component, event)

        // Trigger startResize
        LayoutActions.startResize()

         //Register mouseUp event on Window to cancel the resize wherever mouseup is triggered
        jQuery(window).on('mouseup.resizable', event => {stopResize(component, event)})
        jQuery(window.preview).on('mouseup.resizable', event => {stopResize(component, event)})

        jQuery(window).on('mousemove.resizable', function(event){
            let clientY = Number(event.clientY),
                clientX = Number(event.clientX)

            if(startY > clientY) {
                dimensions.height = dimensions.height + (startY - event.clientY)
            }else if(startY < clientY) {
                dimensions.height = dimensions.height - (event.clientY - startY)
            }

            startX = Number(event.clientX)
            startY = Number(event.clientY)

            component.setState(dimensions)
        })
    }

    event.preventDefault()
    event.stopPropagation()
}

function stopResize(component, event) {
    jQuery(window).unbind('mousemove.resizable')
    jQuery(window).unbind('mouseup.resizable')
    jQuery(window.preview).unbind('mouseup.resizable')
    LayoutActions.stopResize()
}

export function setResizeHandle(component, ...handles) {
    let resizable = component.resizable || {}

    resizable.handles   = handles || []
    component.resizable = resizable
}

export function setCallback(component, callback) {
    let resizable = component.resizable || {}

    resizable.callback  = callback
    component.resizable = resizable
}

export default {setResizeHandle, setCallback, beforeMount, beforeUpdate, beforeRender}