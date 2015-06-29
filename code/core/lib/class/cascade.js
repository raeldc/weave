'use strict'

var key = {
    selector   : Symbol('selector'),
    devicemap  : Symbol('devicemap'),
    stylesheets: Symbol('stylesheets')
}

export default class Cascade {
    constructor(selector, stylesheets) {
        if(!(stylesheets instanceof Map)) {
            throw new Error('Stylesheets must be an instance of Map')
        }

        this[key.selector]   = selector
        this[key.devicemap]   = new Map()
        this[key.stylesheets] = stylesheets
    }

    getSelector() {
        return this[key.selector]
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
