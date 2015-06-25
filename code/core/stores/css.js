'use strict'

var key = {
    stylesheets: Symbol('stylesheets'),
    selector   : Symbol('selector'),
    style      : Symbol('style'),
    media      : Symbol('media')
}

export class Style {
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
            css += `\t${property}: "${value}";\n`
        }

        css += '}'

        return css
    }
}

export class CSS {
    constructor() {
        this[key.stylesheets] = new Map()
        this[key.media]       = new Map()

        this.registerMedia('all', 'all')
    }

    addStyle(selector, style, media = 'all') {
        if(this[key.media].has(media)) {
            let stylesheet = this[key.stylesheets].get(media)

            if(!stylesheet.has(selector)) {
                stylesheet.set(selector, new Style(selector, style))
            }
            else stylesheet.get(selector).replace(style)

            this[key.stylesheets].set(media, stylesheet)

            return this
        }

        throw new Error(`Unregistered Media Alias: ${media}`)
    }

    getStyle(selector, media = 'all') {
        if(this[key.media].has(media)) {
            if(!this[key.stylesheets].get(media).has(selector)) {
                this.addStyle(selector, {}, media)
            }

            return this[key.stylesheets].get(media).get(selector)
        }

        throw new Error(`Unregistered Media Alias: ${media}`)
    }

    registerMedia(alias, query) {
        if(query !== undefined) {
            this[key.media].set(alias, query)
            this[key.stylesheets].set(alias, new Map())
        }

        return this
    }

    toString() {
        let css = ''

        for(let [media, stylesheet] of this[key.stylesheets]) {
            let query = this[key.media].get(media)

            css += `@media ${query} {\n`

            for(let [selector, style] of stylesheet) {
                css += "\n" + style.toString().replace(/^(.*)$/gm, "\t$1") + "\n"
            }

            css += '\n}\n'
        }

        return css
    }
}