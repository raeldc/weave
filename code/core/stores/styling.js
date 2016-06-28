'use strict'

import Stylesheets   from 'core/ui/controls/stylesheets.js'
import Reflux        from 'reflux'
import LayoutActions from 'core/actions/layout.js'

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

    loadStylesheets( styles ) {
        this[key.stylesheets].loadStylesheet(styles)
        return this
    }

    getStylesheets() {
        return this[key.stylesheets]
    }

    listen(func) {
        return this[key.store].listen(func)
    }

    trigger() {
        LayoutActions.nodeTouched()
        return this[key.store].trigger()
    }

    toObject() {
        return this[key.stylesheets].toObject()
    }
}

export default new Styling()
