'use strict'

var key = {
    selector: Symbol('selector'),
    style   : Symbol('style')
}

export default class Style {
    constructor(selector, style = {}) {
        this[key.selector] = selector
        this[key.style]    = new Map()

        if(_.isObject(style)) {
            _.each(style, (value, property) => {
                this.set(property, value)
            })
        }
    }

    getSelector() {
        return this[key.selector]
    }

    getStyle() {
        return this[key.style]
    }

    set(property, value) {
        this[key.style].set(_.toDash(property), value)
        return this
    }

    get(property, defaultValue) {
        return this[key.style].get(_.toDash(property)) || defaultValue
    }

    merge(style) {
        if(_.isObject(style)) {
            _.each(style, (value, property) => {
                this.set(property, value)
            })
        }

        return this
    }

    replace(style) {
        if(_.isObject(style)) {
            this[key.style].clear()
            this.merge(style)
        }

        return this
    }

    toString() {
        let css = `${this[key.selector]} {\n`

        for(let [property, value] of this[key.style]) {
            css += `\t${property}: ${value};\n`
        }

        css += '}'

        return css
    }
}