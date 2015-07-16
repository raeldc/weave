'use strict'

import Styling from 'core/stores/styling.js'

function getClass(id) {
    return '.' + id
}

export function mergeStyle(node, properties, device = 'all') {
    Styling.getStylesheets().get(device).mergeStyle(getClass(node), properties)
    Styling.trigger()
}

export function replaceStyle(node, properties, device = 'all') {
    Styling.getStylesheets().get(device).replaceStyle(getClass(node), properties)
    Styling.trigger()
}

export function deleteStyle(node, device = 'all') {
    Styling.getStylesheets().get(device).deleteStyle(getClass(node))
    Styling.trigger()
}

export function removeProperties(node, properties, device = 'all') {
    Styling.getStylesheets().get(device).removeProperties(getClass(node), properties)
    Styling.trigger()
}

export function reorderBackgrounds(node, params = {}, device = 'all') {
    const
        stylesheet = Styling.getStylesheets().get(device),
        style      = stylesheet.getStyle(getClass(node))

    style.reorderBackgrounds(params.subject, params.target)

    stylesheet.flush()
    Styling.trigger()
}

export function removeBackground(node, id, device = 'all') {
    const stylesheet = Styling.getStylesheets().get(device)

    stylesheet.getStyle(getClass(node)).removeBackground(id)
    stylesheet.flush()

    Styling.trigger()
}

export function toggleStyle(node, properties, device = 'all') {
    let style = getStyle(node, device)

    if(style.compareProperties(properties)) {
        removeProperties(node, properties, device)
        Styling.trigger()
    }
    else mergeStyle(node, properties, device)
}

export function defaultStyle(node, properties, device = 'all') {
    Styling.getStylesheets().get(device).defaultStyle(getClass(node), properties)
    Styling.trigger()
}

export function getStyle(node, device = 'all') {
    return Styling.getStylesheets().get(device).getStyle(getClass(node))
}

export function getCascade(node, device) {
    return Styling.getStylesheets().getCascade(getClass(node))
}

export function onChangeStyle(func) {
    return Styling.listen(func)
}

export default {replaceStyle, defaultStyle, toggleStyle, getStyle, onChangeStyle}
