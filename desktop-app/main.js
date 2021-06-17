const {app, BrowserWindow, ipcMain} = require('electron')
const bodyParser = require('body-parser')
const express = require("express")
const path = require('path')

const expressApp = express()
const routes = require("./routes")

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;

const http = require('http');
const socketio = require('socket.io');
const serverApp = express();

const server = http.createServer(serverApp);
const io = socketio(server);

let teams = {red: [], blue: []}

serverApp.use(express.static(path.join(__dirname, 'server')));

server.listen(port, () => console.log(`Server listening on port ${port}`));

ipcMain.on('message', (event, message) => {
    // console.log(message);
    io.emit('message', message);
})

ipcMain.on('change-screen-client', (event, screen) => {
    // console.log(event, screen);
    io.emit('change-screen-client', screen);
})

const fs = require('fs');

function loadPoll(filename) {
    const filepath = path.join(__dirname, 'data', filename);
    return JSON.parse(fs.readFileSync(filepath));
}

let pollResponses = {};

ipcMain.on('save-poll', (event, pollData) => {
    console.log(pollData);
    fs.writeFileSync();
})

// Teacher sends poll to students
ipcMain.on('display-poll', (event) => {
    let filename = 'poll.json';
    let data = loadPoll(filename);
    io.emit('display-poll', data);
    pollResponses = data;
    pollResponses.questions.forEach((question) => {
        question.responses = question.responses.map((response) => {
            return {name: response, count: 0}
        });
    })
})

function sendPoll(pollData) {
    
}

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

    // Socket connection
    io.on('connection', socket => {

        let id = socket.id;
        
        // Update the team count on the main page
        function updateTeams() {
            let teamsCount = {red: teams.red.length, blue: teams.blue.length};
            mainWindow.send('update-teams', teamsCount);
        }

        // Assign new users to a team and update their info
        let team;
        if (teams.red.length <= teams.blue.length) {
            teams.red.push(id);
            socket.emit('set-color', 'red');
            team = 'red';
        } else {
            teams.blue.push(id);
            socket.emit('set-color', 'blue');
            team = 'blue';
        }
        updateTeams();
        
        // Dolphin clicker: When a click is received from the client, increase the count on the main page
        socket.on('click', () => {
            mainWindow.send('add-click-count', team);
        })

        socket.on('poll-respond', (answers) => {
            // console.dir(pollResponses.questions[0]);
            for (let question = 0; question < answers.length; question++) {
                let response = answers[question];
                // console.log(response);
                pollResponses.questions[question].responses[response].count++;
                // console.log('question:', question, 'response:', response, 'total:', pollResponses.questions[question].responses[response]);
            }
            mainWindow.send('update-poll-responses', pollResponses);
        })
        
        // Remove users from their team when disconnected
        socket.on('disconnect', () => {
            // console.log(teams[team]);
            let index = teams[team].indexOf(id);
            teams[team].splice(index, 1);
            updateTeams();
        })
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
