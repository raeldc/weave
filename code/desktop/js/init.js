import {app}   from 'electron'
import path    from 'path'
import url     from 'url'
import fs      from 'fs'
import start   from './windows/start.js'
import builder from './windows/builder.js'
import {enableLiveReload} from 'electron-compile'


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let activeWindow

function initialize() {
    let userDataPath = app.getPath('userData'),
        projectsPath

    // Create User Data directory if it doesn't exist yet
    if(!fs.accessSync(userDataPath, fs.constants.W_OK)) {
        fs.mkdirSync(userDataPath)
    }

    // Create Projects directory if it doesn't exist yet
    // Check for recently opened projects and open the latest
    // Open Start window if there is no recently opened project
    // Check for user's license
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', initialize)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (activeWindow === null) {
        initialize()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
