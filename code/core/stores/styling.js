'use strict'

import Stylesheets from 'core/ui/controls/stylesheets.js'
import Reflux      from 'reflux'

var key = {
    store      : Symbol('store'),
    stylesheets: Symbol('stylesheets')
}

export class Styling {
    constructor() {
        this[key.store] = Reflux.createStore()
    }

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

    listen(func) {
        return this[key.store].listen(func)
    }

    trigger() {
        return this[key.store].trigger()
    }
}

export default new Styling()
