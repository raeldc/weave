'use strict'

import Stylesheet from 'core/lib/class/stylesheet.js'

var key = {
    document   : Symbol('document'),
    stylesheets: Symbol('stylesheets')
}

export default class Stylesheets {
    constructor(document) {
        if(!_.isNode(document)) {
            throw new Error('Cannot create new Stylesheets Object without a document object. Try window.document.')
        }

        this[key.document]    = document
        this[key.stylesheets] = new Map()
    }

    create(alias = 'all', query = 'all') {
        if(!this[key.stylesheets].has(alias)){
            let domElement = this[key.document].createElement('style')

            domElement.setAttribute('media', query)

            // WebKit hack :(
            domElement.appendChild(this[key.document].createTextNode(`/* ${alias} */`))

            // Add the <style> element to the page
            this[key.document].head.appendChild(domElement)
            this[key.stylesheets].set(alias, new Stylesheet(query, domElement.sheet))
        }

        return this
    }

    get(alias = 'all') {
        return this[key.stylesheets].get(alias)
    }
}
