'use strict'

import Stylesheets from 'core/ui/controls/stylesheets.js'

var key = {
    store      : Symbol('store'),
    stylesheets: Symbol('stylesheets')
}

export class Styling {
    setDocument(document) {
        if(!(this[key.stylesheets] instanceof Stylesheets)) {
            this[key.stylesheets] = new Stylesheets(document)
            return this
        }

        throw new Error('Cannot set document more than once')
    }

    getStylesheets() {
        return this[key.stylesheets]
    }
}

export default new Styling()
