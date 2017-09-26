'use strict'

import fs from 'fs'

// Create Directory if it doesn't exist, throw error if it can't be created
export function requireDirectory(path) {
    // Create Projects directory if it doesn't exist yet
    try{
        fs.mkdirSync(path)
    }catch(error){
        // Ignore the error
    }

    fs.accessSync(path, fs.constants.W_OK)
}

export default {requireDirectory}