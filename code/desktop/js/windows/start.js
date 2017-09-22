import {BrowserWindow} from 'electron'

var browser

export function open() {
    if (browser === undefined) {
        // Create the browser window.
        browser = new BrowserWindow({
            width      : 800,
            height     : 400,
            center     : true,
            resizable  : false,
            minimizable: false,
            maximizable: false,
            transparent: true,
            frame      : false,
        })

        // and load the index.html of the app.
        browser.loadURL(url.format({
            pathname: path.join(__dirname, '../opening.html'),
            protocol: 'file:',
            slashes : true
        }))

        // Open the DevTools.
        //browser.webContents.openDevTools()

        // Emitted when the window is closed.
        browser.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            browser = null
        })
    }

    return browser
}

export default {open}