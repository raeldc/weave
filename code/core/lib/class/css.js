'use strict'

import Style from 'core/lib/class/style.js'

var key = {
    stylesheets: Symbol('stylesheets'),
    media      : Symbol('media')
}

export default class CSS {
    constructor() {
        this[key.stylesheets] = new Map()
        this[key.media]       = new Map()

        this.registerMedia('all', 'all')
    }

    registerMedia(alias, query) {
        if(query !== undefined) {
            this[key.media].set(alias, query)
            this[key.stylesheets].set(alias, new Map())

            return this
        }

        throw new Error(`Trying to Register Media: ${alias} without a Query`)
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

    getMediaQuery(alias) {
        if(this[key.media].has(alias)) {
            return this[key.media].get(alias)
        }

        throw new Error(`Unknown Media: ${alias}`)
    }

    getStylesheet(media = all) {
        if(this[key.stylesheets].has(media)) {
            return this[key.stylesheets].get(media)
        }

        throw new Error(`Unknown Media: ${media}`)
    }

    toString(media) {
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