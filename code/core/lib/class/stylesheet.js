'use strict'

import Style from 'core/lib/class/style.js'

var key = {
    stylesheet: Symbol('stylesheet'),
    sheet     : Symbol('sheet'),
    query     : Symbol('query')
}

export default class Stylesheet {
    constructor(query = 'all', sheet) {
        this[key.stylesheet] = new Map()
        this[key.query]      = query

        if("insertRule" in sheet) {
            this[key.sheet] = sheet
        }
    }

    addStyle(selector, style) {
        if(!this[key.stylesheet].has(selector)) {
            this[key.stylesheet].set(selector, new Style(selector, style))
        }
        else this[key.stylesheet].get(selector).replace(style)

        return this
    }

    replaceStyle(selector, style) {
        return this.addStyle(selector, style)
    }

    editStyle(selector, style) {
        if(this[key.stylesheet].has(selector)) {
            this[key.stylesheet].get(selector).merge(style)
            return this
        }

        throw new Error(`Unknown Selector ${selector}`)
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

    getSheet() {
        return this[key.sheet]
    }

    flush(selector) {
        if(this[key.sheet] !== undefined) {
            if(selector === undefined) {
               let index = 0
               for(let [selector, style] of this[key.stylesheet]) {
                   this[key.sheet].insertRule(style.toString(), index)
                   index++
               }
            }
            else this[key.sheet].insertRule(this.getStyle(selector).toString(), this[key.sheet].cssRules.length)
        }
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