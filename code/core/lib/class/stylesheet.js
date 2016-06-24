'use strict'

import Style from 'core/lib/class/style.js'

const key = {
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

    addStyle(selector, properties) {
        return this.replaceStyle(selector, properties)
    }

    defaultStyle(selector, properties) {
        if(!this[key.stylesheet].has(selector)) {
            this[key.stylesheet].set(selector, new Style(selector, properties))
        }
        else this[key.stylesheet].get(selector).append(properties)

        this.flush(selector)

        return this
    }

    replaceStyle(selector, properties) {
        if(!this[key.stylesheet].has(selector)) {
            this[key.stylesheet].set(selector, new Style(selector, properties))
        }
        else this[key.stylesheet].get(selector).replace(properties)

        this.flush(selector)

        return this
    }

    removeProperties(selector, properties) {
        if(this[key.stylesheet].has(selector)) {
            this[key.stylesheet].get(selector).delete(...Object.keys(properties))
            this.flush(selector)

            return this
        }

        throw new Error(`Unknown Selector ${selector}`)
    }

    deleteStyle(selector) {
        this[key.stylesheet].delete(selector)
        this.flush(selector)

        return this
    }

    mergeStyle(selector, properties) {
        if(this[key.stylesheet].has(selector)) {
            this[key.stylesheet].get(selector).merge(properties)
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
    toObject() {
        var obj = {}
        for(let [key, value] of this[key.stylesheet]) {
            obj[key] = value.toObject()
        }
        return obj
    }
    loadStyle(styles) {
        _.each(styles, (props, selector) => {
            if(_.isObject(props.properties) && props.properties.fontFamily){
                props.properties.fontFamily = props.properties.fontFamily.replace(/(\\)+/g, '')
            }
            this.replaceStyle(selector, {})
            _.each(props.backgrounds, (backgroundProperties, backgroundId) => {
                this[key.stylesheet].get(selector).set('background', backgroundProperties)
                this.replaceStyle(selector, {
                    background: backgroundProperties
                })
            })
            this.replaceStyle(selector, props.properties)
        })
    }
