'use strict'

const keys = {
    data : Symbol('data')
}

export default class StoreObject {
    constructor(data) {
        if (!(data instanceof Object)) throw new TypeError('data must be an Object')

        this[keys.data] = {}
        this.add(data)
    }

    registerProperty(key) {
        var prop    = {}
        prop[key] = {}

        prop[key].get = function() {
           return this.get(key)
        }

        prop[key].set = function(value) {
            return this.set(key , value)
        }

        Object.defineProperties(this, prop)
    }

    get(key) {
        var result = this[keys.data][key]

        if(result === undefined){
            result = false
        }

        return result
    }

    set(key, value) {
        if (value instanceof Object && !Array.isArray(value)) {
            value = new StoreObject(value)
        }

        this[keys.data][key] = value
        return this
    }

    has(key) {
        return this[keys.data][key] !== undefined
    }

    remove(key) {
        delete this[keys.data][key]
        return this
    }

    add(key, value) {
        if(key instanceof Object) {
            let data = key
            // Setter/Getter for the main keys in data
            for (let key in data) {
                // Do not add methods
                if (typeof data[key] !== 'function') {
                    // Add property setter or getter
                    this.add(key, data[key])
                }
            }
        }else {
            this.registerProperty(key)
            this.set(key, value)
        }

        return this
    }

    append(data) {
        if (data instanceof Object) {
            for (var key in data) {
                // Do not add methods and don't add if it already exists
                if (typeof data[key] !== 'function' && this[keys.data][key] === undefined) {
                    // Add property setter or getter
                    this.add(key, data[key])
                }
            }
        }

        return this
    }

    toObject() {
        return this[keys.data]
    }
}
