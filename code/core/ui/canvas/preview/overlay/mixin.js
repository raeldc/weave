'use strict'

import UIConfig      from 'core/stores/uiconfig.js'
import LayoutActions from 'core/actions/layout.js'

function afterMount(component) {
    component.stopListeningToFrameChanged = LayoutActions.frameChanged.listen((node) => adaptOverlay(component, node))
    component.stopListeningToNodeTouched  = LayoutActions.nodeTouched.listen((node) => adaptOverlay(component, node))
}

function beforeUnmount(component) {
    component.stopListeningToFrameChanged()
    component.stopListeningToNodeTouched()
}

export function initialize(component) {
    component.nextState = {
        left     : 0,
        right    : 0,
        width    : 0,
        height   : 0,
        visible  : false,
        className: 'hidden',
        target   : null
    }

    return _.clone(component.nextState)
}

export function displayOverlay(component, node) {
    component.listenToReverseSelection()

    component.nextState.visible = true
    component.nextState.target  = ReactDOM.findDOMNode(node)

    adaptOverlay(component)
}

export function hideOverlay(component, node) {
    component.stopListeningToReverseSelection()
    component.setState(initialize(component), component.forceUpdate)
}

export function adaptOverlay(component, node) {
    var position,
        $dom  = jQuery(component.nextState.target || null)

    if($dom && component.nextState.visible) {
        position = $dom.offset()

        component.nextState.width  = $dom.outerWidth()
        component.nextState.height = $dom.outerHeight()
        component.nextState.top    = position.top - jQuery(window.preview).scrollTop()
        component.nextState.left   = position.left - jQuery(window.preview).scrollLeft()
    }

    component.setState(component.nextState)
}

export default {afterMount, beforeUnmount}