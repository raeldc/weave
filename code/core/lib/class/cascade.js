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

    hasProperty(property, value, device) {
        for(let [alias, stylesheet] of this[key.stylesheets]) {
            if(device !== undefined && device !== alias) {
                continue
            }

            if(stylesheet.hasStyle(this.getSelector())) {
                let style = stylesheet.getStyle(this.getSelector())
                if(style.hasProperty(property)) {
                    if(value !== undefined) {
                        if(style.get(property) === value) {
                            return true
                        }
                    }
                    else return true
                }
            }
        }

        return false
    }

    inheritsProperty(property, value, ...devices) {
        // Always put 'all' first in the stack of devices to check
        devices = _.without(devices, 'all')
        devices.unshift('all')

        for(let device of devices) {
            console.log('has property', property, value, device)
            if(this.hasProperty(property, value, device)) {
                console.log(true)
                return true
            }
        }
        console.log(false)
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
}
