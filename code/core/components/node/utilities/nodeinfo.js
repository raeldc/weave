'use strict'

export function getNodeInfo(component) {
    let $target    = jQuery(React.findDOMNode(component)),
        nodeOffset = $target.offset()

    component.nodeInfo = {
        width : $target.outerWidth(),
        height: $target.outerHeight(),
        top   : nodeOffset.top - jQuery(window).scrollTop(),
        left  : nodeOffset.left
    }

    return component.nodeInfo
}

export function resetNodeInfo(component) {
    component.nodeInfo       = undefined
    component.cursorPosition = undefined
}

export function getCursorPosition(component, event, threshold = .5) {
    let position = {
        top   : false,
        right : false,
        bottom: false,
        left  : false,
        inside: false
    }, yThreshold, xThreshold

    if(component.nodeInfo) {
        // This means we're passing a threshold value in pixels
        if(threshold <= 1) {
            // Get the pixel size based on the percentable
            yThreshold = component.nodeInfo.height * threshold
            xThreshold = component.nodeInfo.width  * threshold
        }else {
            threshold = parseInt(threshold)
            yThreshold = threshold
            xThreshold = threshold
        }

        if(event.clientY < (component.nodeInfo.top + yThreshold)) {
            position.top = true
        }

        if(event.clientX > component.nodeInfo.left + (component.nodeInfo.width - (xThreshold))) {
            position.right = true
        }

        if(event.clientY > (component.nodeInfo.top + (component.nodeInfo.height - (yThreshold)))) {
            position.bottom = true
        }

        if(event.clientX < component.nodeInfo.left + (xThreshold)) {
            position.left = true
        }

        if((event.clientX <= component.nodeInfo.left + component.nodeInfo.width) && (event.clientY <= component.nodeInfo.top + component.nodeInfo.height)) {
            position.inside = true
        }
    }

    return position
}

export default {getNodeInfo, resetNodeInfo, getCursorPosition}