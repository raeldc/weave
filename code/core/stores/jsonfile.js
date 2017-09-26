'use strict'

import JSONFile    from 'jsonfile'
import StoreObject from 'core/stores/object'

var keys = {
    path: Symbol('path')
}

export default class JSONObject extends StoreObject {
    constructor(data, path) {
        super({})
        if(typeof data === 'string') {
            this.load(data)
        }else if(typeof path === 'string') {
            this[keys.path] = path
        }else {
            throw new Error('JSONObject must be instantiated with a path (2nd argument)')
        }
    }

    load(path) {
        var data = {}

        try {
            data = JSONFile.readFileSync(path)
        }catch(error) {
            // ignore the error. The file most probably doesn't exist
        }

        // Set the new path
        this[keys.path] = path

        return this.add(data)
    }

    save() {
        JSONFile.writeFileSync(this[keys.path], this.toObject())
    }
}