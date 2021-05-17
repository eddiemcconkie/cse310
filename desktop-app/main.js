const {app, BrowserWindow} = require('electron')
const bodyParser = require('body-parser')
const express = require("express")
const path = require('path')

const expressApp = express()
const routes = require("./routes")

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadURL('http://localhost:5500/')
}

app.whenReady().then(() => {
    expressApp.set('view engine', 'ejs')
              .set('views', path.join(__dirname,'views'))
              .use(bodyParser.urlencoded({extended: false}))
              .use(express.static(path.join(__dirname, 'public')))
              .use(routes)
              .listen(5500, () => {
                  createWindow()
              })
})

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
