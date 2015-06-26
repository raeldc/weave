'use strict'

import Styling from 'core/stores/styling.js'

function getClass(id) {
    return '.' + id
}

export function changeStyle(node, style, device = 'all') {
    Styling.getStylesheets().get(device).replaceStyle(getClass(node), style)
}

export function defaultStyle(node, style, device = 'all') {
    Styling.getStylesheets().get(device).defaultStyle(getClass(node), style)
}

export default {changeStyle, defaultStyle}
