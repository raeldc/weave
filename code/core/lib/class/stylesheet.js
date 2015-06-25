'use strict'

import Style from 'core/lib/class/style.js'

var key = {
    stylesheet: Symbol('stylesheet'),
    query     : Symbol('query')
}

export default class Stylesheet {
    constructor(query = 'all') {
        this[key.stylesheet] = new Map()
        this[key.query]      = query
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

    getQuery() {
        return this[key.query]
    }

    inlineCSS() {
        return this.toString(true)
    }

    toString(inline = false) {
        let css = ''

        for(let [selector, style] of this[key.stylesheet]) {
            css += "\n" + style.toString() + "\n"
        }

        return inline ? `@media ${this[key.query]} {\n${css.replace(/^(.*)$/gm, "\t$1")}\n}\n` : css
    }
}