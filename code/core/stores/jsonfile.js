'use strict'

import fs from 'fs'

var key = {
    data: Symbol('data'),
    path: Symbol('path')
}

export default class JSONFile {
    constructor(...arg) {
        let {data, path} = arg

        // Open file if data is a path
        if(typeof data === 'string') {
            if(fs.accessSync(data, fs.constants.W_OK)) {
                this[key.path] = data
                this[key.data] = JSON.parse(fs.readFileSync(data))
            }
        }elseif(typeof data === 'object') {
            if(typeof path !== 'string') {
                throw new Error('Path to the file is required.')
            }elseif(!fs.accessSync(path, fs.constants.W_OK)) {
                throw new Error('File should be writable.')
            }else {
                this[key.data] = JSON.parse(fs.readFileSync(data))
            }

            this[key.data] = data || {}
            this[key.path] = path
        }

        throw new Error('Error initilizing JSONFile because of unrecorgnized arguments')
    }

    getProperty(name) {
        return this[key.data][name]
    }

    setProperty(name, value) {
        return this[key.data][name] = value
    }

    save() {
        var jsondata = JSON.stringify(this[key.data])
        fs.writeFileSync(this[key.path], jsondata)

        return this
    }
}