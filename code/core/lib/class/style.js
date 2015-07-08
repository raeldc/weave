'use strict'

const key = {
    selector   : Symbol('selector'),
    properties : Symbol('properties')
}

export default class Style {
    constructor(selector, properties = {}) {
        this[key.selector]   = selector
        this[key.properties] = new Map()

        if(_.isObject(properties)) {
            _.each(properties, (value, property) => {
                this.set(property, value)
            })
        }
    }

    getSelector() {
        return this[key.selector]
    }

    getProperties() {
        return this[key.properties]
    }

    set(property, value) {
        this[key.properties].set(property, value)
        return this
    }

    get(property, defaultValue) {
        return this[key.properties].get(property) || defaultValue
    }

    hasProperty(property) {
        return this[key.properties].has(property)
    }

    delete(...properties) {
        for(let property of properties) {
            this[key.properties].delete(property)
        }

        return this
    }

    merge(properties) {
        if(_.isObject(properties)) {
            _.each(properties, (value, property) => {
                this.set(property, value)
            })
        }

        return this
    }

    append(properties) {
        if(_.isObject(properties)) {
            _.each(properties, (value, property) => {
                if(!this.has(property)) {
                    this.set(property, value)
                }
            })
        }

        return this
    }

    replace(properties) {
        if(_.isObject(properties)) {
            this[key.properties].clear()
            this.merge(properties)
        }

        return this
    }

    compareProperty(property, value) {
        if(this.get(property) === value) {
            return true
        }

        return false
    }

    compareProperties(properties) {
        let result = false

        for(let property of Object.keys(properties)) {
            result = true

            if(this.get(property) !== properties[property]) {
                return false
            }
        }

        return result
    }

    toString() {
        let css = `${this[key.selector]} {\n`

        for(let [property, value] of this[key.properties]) {
            css += `\t${_.toDash(property)}: ${value};\n`
        }

        css += '}'

        return css
    }
}
