'use strict'

import Styling from 'core/stores/styling.js'

function getClass(id) {
    return '.' + id
}

export function changeStyle(node, style, device = 'all') {
    Styling.getStylesheets().get(device).replaceStyle(getClass(node), style)
    Styling.trigger()
}

export function defaultStyle(node, style, device = 'all') {
    Styling.getStylesheets().get(device).defaultStyle(getClass(node), style)
    Styling.trigger()
}

export function getStyle(node, device = 'all') {
    return Styling.getStylesheets().get(device).getStyle(getClass(node))
}

export function onChangeStyle(func) {
    return Styling.listen(func)
}

export default {changeStyle, defaultStyle, getStyle, onChangeStyle}
