'use strict'

import Style from 'core/lib/class/style.js'

var key = {
    devicemap  : Symbol('devicemap'),
    stylesheets: Symbol('stylesheets')
}

export default class Cascade extends Style {
    constructor(selector, stylesheets) {
        if(!(stylesheets instanceof Map)) {
            throw new Error('Stylesheets must be an instance of Map')
        }

        super(selector, {})

        this[key.devicemap]   = new Map()
        this[key.stylesheets] = stylesheets
    }

    hasProperty(property) {
        for(let [device, stylesheet] of this[key.stylesheets]) {
            if(stylesheet.hasStyle(this.getSelector())) {
                if(stylesheet.getStyle(this.getSelector()).hasProperty(property)) {
                    return true
                }
            }
        }

        return false
    }

    getPropertyStylesheets(property, value) {
        let stylesheets = new Set()

        for(let [device, stylesheet] of this[key.stylesheets]) {
            if(stylesheet.hasStyle(this.getSelector())) {
                let style = stylesheet.getStyle(this.getSelector())

                if(style.hasProperty(property)) {
                    if(value !== undefined) {
                        if(style.get(property) === value) {
                            stylesheets.add(device)
                        }
                    }
                    else stylesheets.add(device)
                }
            }
        }

        return stylesheets.values()
    }

    compareProperty(property, value) {
        for(let [device, stylesheet] of this[key.stylesheets]) {
            if(stylesheet.hasStyle(this.getSelector())) {
                let style = stylesheet.getStyle(this.getSelector())
                if(style.hasProperty(property)) {
                    if(style.get(property) === value) {
                        return true
                    }
                }
            }
        }

        return false
    }
}
