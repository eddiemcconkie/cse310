const {app, BrowserWindow, ipcMain} = require('electron')
const bodyParser = require('body-parser')
const express = require("express")
const path = require('path')

const expressApp = express()
const routes = require("./routes")

const http = require('http');
const socketio = require('socket.io');
const serverApp = express();

const server = http.createServer(serverApp);
const io = socketio(server);

serverApp.use(express.static(path.join(__dirname, 'server')));

io.on('connection', socket => {
    // console.log('New WS Connection...');
})

server.listen(8000, () => console.log("Server listening on port 8000"));

ipcMain.on('message', (event, message) => {
    // console.log(message);
    io.emit('message', message);
})
// expressApp.get('/', (req, res) => {
    // if (req.query.msg) {
    // let msg = req.query.msg;
    // serverApp.emit('message', msg);
    // }
// });

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
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
