'use strict'

import Style from 'core/lib/class/style.js'

var key = {
    stylesheet: Symbol('stylesheet'),
    media     : Symbol('media'),
    query     : Symbol('query')
}

export default class CSS {
    constructor(media = 'all', query = 'all') {
        this[key.stylesheet] = new Map()
        this[key.media]       = media
        this[key.query]       = query
    }

    addStyle(selector, style) {
        if(!this[key.stylesheet].has(selector)) {
            this[key.stylesheet].set(selector, new Style(selector, style))
        }
        else this[key.stylesheet].get(selector).replace(style)

        return this
    }

    getStyle(selector) {
        if(!this[key.stylesheet].has(selector)) {
            this.addStyle(selector, {})
        }

        return this[key.stylesheet].get(selector)
    }

    getAlias() {
        return this[key.media]
    }

    getQuery() {
        return this[key.query]
    }

    toString(inline = false) {
        let css = ''

        for(let [selector, style] of this[key.stylesheet]) {
            css += "\n" + style.toString() + "\n"
        }

        return inline ? `@media ${this[key.query]} {\n${css.replace(/^(.*)$/gm, "\t$1")}\n}\n` : css
    }
}