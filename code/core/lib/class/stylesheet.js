'use strict'

import Style from 'core/lib/class/style.js'

var key = {
    stylesheet: Symbol('stylesheet'),
    sheet     : Symbol('sheet'),
    index     : Symbol('index'),
    query     : Symbol('query'),
}

export default class Stylesheet {
    constructor(query = 'all', sheet) {
        this[key.stylesheet] = new Map()
        this[key.index]      = new Map()
        this[key.query]      = query

        if("insertRule" in sheet) {
            this[key.sheet] = sheet
        }
    }

    addStyle(selector, style) {
        return this.replaceStyle(selector, style)
    }

    replaceStyle(selector, style) {
        if(!this[key.stylesheet].has(selector)) {
            this[key.stylesheet].set(selector, new Style(selector, style))
        }
        else this[key.stylesheet].get(selector).replace(style)

        this.flush(selector)

        return this
    }

    deleteStyle(selector) {
        this[key.stylesheet].delete(selector)
        this.flush(selector)

        return this
    }

    editStyle(selector, style) {
        if(this[key.stylesheet].has(selector)) {
            this[key.stylesheet].get(selector).merge(style)
            this.flush(selector)
            return this
        }

        throw new Error(`Unknown Selector ${selector}`)
    }

    hasStyle(selector) {
        return this[key.stylesheet].has(selector)
    }

    getStyle(selector) {
        if(!this[key.stylesheet].has(selector)) {
            this.addStyle(selector, {})
        }

        return this[key.stylesheet].get(selector)
    }

    getIndex(selector) {
        if(selector !== undefined) {
            return this[key.index].get(selector)
        }

        return this[key.index]
    }

    getQuery() {
        return this[key.query]
    }

    getSheet() {
        return this[key.sheet]
    }

    flush(selector) {
        if(this.getSheet() !== undefined) {
            if(selector === undefined) {
                let index = 0

                for(let [selector, style] of this[key.stylesheet]) {
                    this.getSheet().deleteRule(index)
                    this.getSheet().insertRule(style.toString(), index)
                    this.getIndex().set(selector, index)
                    index++
                }

                // Delete the rest of the rules
                {
                    let size = this.getSheet().cssRules.length

                    while(index < size) {
                        this.getSheet().deleteRule(index)
                        index++
                    }
                }
            }else {
                if(this.hasStyle(selector)) {
                    let index = this.getIndex(selector)

                    if(index !== undefined) {
                        this.getSheet().deleteRule(index)
                    }
                    else index = this.getSheet().cssRules.length

                    this.getSheet().insertRule(this.getStyle(selector).toString(), index)
                    this.getIndex().set(selector, index)
                }
                else this.flush()
            }
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