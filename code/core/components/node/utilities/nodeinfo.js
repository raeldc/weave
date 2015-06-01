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
    }

    if(component.nodeInfo) {
        if(event.clientY < (component.nodeInfo.top + (component.nodeInfo.height * threshold))) {
            position.top = true
        }

        if(event.clientX > component.nodeInfo.left + (component.nodeInfo.width - (component.nodeInfo.width * threshold))) {
            position.right = true
        }

        if(event.clientY > (component.nodeInfo.top + (component.nodeInfo.height - (component.nodeInfo.height * threshold)))) {
            position.bottom = true
        }

        if(event.clientX < component.nodeInfo.left + (component.nodeInfo.width * threshold)) {
            position.left = true
        }

        if((event.clientX <= component.nodeInfo.left + component.nodeInfo.width) && (event.clientY <= component.nodeInfo.top + component.nodeInfo.height)) {
            position.inside = true
        }
    }

    return position
}

export default {getNodeInfo, resetNodeInfo, getCursorPosition}