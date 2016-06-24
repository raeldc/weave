'use strict'

import Stylesheet from 'core/lib/class/stylesheet.js'
import Cascade    from 'core/lib/class/cascade.js'

const key = {
    document   : Symbol('document'),
    cascades   : Symbol('cascades'),
    stylesheets: Symbol('stylesheets')
}

export default class Stylesheets {
    constructor(document) {
        if(!_.isNode(document)) {
            throw new Error('Cannot create new Stylesheets Object without a document object. Try window.document.')
        }

        this[key.document]    = document
        this[key.stylesheets] = new Map()
        this[key.cascades]    = new Map()
    }

    create(device = 'all', query = 'all') {
        if(!this[key.stylesheets].has(device)){
            let domElement = this[key.document].createElement('style')

            domElement.setAttribute('media', query)

            // WebKit hack :(
            domElement.appendChild(this[key.document].createTextNode(`/* ${device} */`))

            // Add the <style> element to the page
            this[key.document].head.appendChild(domElement)
            this[key.stylesheets].set(device, new Stylesheet(query, domElement.sheet))
        }

        return this
    }

    get(device = 'all') {
        return this[key.stylesheets].get(device)
    }

    getCascade(selector) {
        if(!this[key.cascades].has(selector)) {
            this[key.cascades].set(selector, new Cascade(selector, this[key.stylesheets]))
        }

        return this[key.cascades].get(selector)
    }

    toObject() {
        var obj = {}
        for (let [key, value] of this[key.stylesheets]) {
            obj[key] = value.toObject()
        }
        return obj
    }

    loadStyle(stylesheet) {
        _.each(stylesheet, (declaration, device) => {
            this[key.stylesheets].get(device).loadStyle(declaration)
        })
    }
}
