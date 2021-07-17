const { app, BrowserWindow, ipcMain } = require('electron')
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')

// expressApp runs the teacher side of the application
// serverApp runs the student side of the application
const expressApp = express()
const routes = require('./routes')

const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 3000

const https = require('https')
const socketio = require('socket.io')
const serverApp = express()

const fs = require('fs')

// Create a secure server for the students to connect to
const server = https.createServer(
  {
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem'))
  },
  serverApp
)
const io = socketio(server)

let teams = { red: [], blue: [] }

serverApp.use(express.static(path.join(__dirname, 'server')))

server.listen(port, () => console.log(`Server listening on port ${port}`))

// Generic Electron message event
ipcMain.on('message', (event, message) => {
  io.emit('message', message)
})

// Teacher changes the screen displayed on student end
ipcMain.on('change-screen-client', (event, screen) => {
  io.emit('change-screen-client', screen)
})

// Load the data for the poll created by the teacher
function loadPoll(filename) {
  const filepath = path.join(__dirname, 'data', filename)
  return JSON.parse(fs.readFileSync(filepath))
}

let pollResponses = {}

// Incomplete: Teacher can save poll to a file
ipcMain.on('save-poll', (event, pollData) => {
  console.log(pollData)
  fs.writeFileSync()
})

// Teacher sends poll to students
ipcMain.on('display-poll', (event) => {
  let filename = 'poll.json'
  let data = loadPoll(filename)
  io.emit('display-poll', data)
  pollResponses = data
  pollResponses.questions.forEach((question) => {
    question.responses = question.responses.map((response) => {
      return { name: response, count: 0 }
    })
  })
})

let raisedHands = []

// Create the main window that will be used by Electron
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

  // Update the list of students with their hands raised on the teacher screen
  function updateRaisedHands() {
    mainWindow.send('update-raised-hands', raisedHands)
  }

  // Socket connection needs to be declared inside createWindow() so that responses from the students can be forwarded to the teacher
  io.on('connection', (socket) => {
    let id = socket.id

    // Update the team count on the main page
    function updateTeams() {
      let teamsCount = { red: teams.red.length, blue: teams.blue.length }
      socket.emit('teamsCount', teamsCount)
      mainWindow.send('update-teams', teamsCount)
    }

    socket.on('updateTeamsNow', (count) => {
      mainWindow.send('update-teams', count)
    })

    // Assign new users to a team and update their info
    let team
    if (teams.red.length <= teams.blue.length) {
      teams.red.push(id)
      socket.emit('set-color', 'red')
      team = 'red'
    } else {
      teams.blue.push(id)
      socket.emit('set-color', 'blue')
      team = 'blue'
    }
    updateTeams()

    // Dolphin clicker: When a click is received from the client, increase the count on the main page
    socket.on('click', () => {
      mainWindow.send('add-click-count', team)
    })

    socket.on('poll-respond', (answers) => {
      // console.dir(pollResponses.questions[0]);
      for (let question = 0; question < answers.length; question++) {
        let response = answers[question]
        // console.log(response);
        pollResponses.questions[question].responses[response].count++
        // console.log('question:', question, 'response:', response, 'total:', pollResponses.questions[question].responses[response]);
      }
      socket.emit('total-connected', teams.red.length + teams.blue.length)
      mainWindow.send('update-poll-responses', pollResponses)
    })

    // Notify the teacher when the student has entered their name
    socket.on('joined-class', (username) => {
      mainWindow.send('joined-class', username)
      mainWindow.send('changeScreen')
    })

    // Raise and lower hand events
    function lowerHand() {
      raisedHands = raisedHands.filter((student) => student.id !== id)
      updateRaisedHands()
    }

    socket.on('raise-hand', (username) => {
      raisedHands.push({ id, username })
      updateRaisedHands()
    })

    socket.on('lower-hand', () => {
      lowerHand()
    })

    // Remove users from their team when disconnected
    socket.on('disconnect', () => {
      // console.log(teams[team]);
      let index = teams[team].indexOf(id)
      teams[team].splice(index, 1)
      updateTeams()
      lowerHand()
    })
  })

  mainWindow.loadURL('http://localhost:5500/')
}

// App initialization and maintenance
app.whenReady().then(() => {
  expressApp
    .set('view engine', 'ejs')
    .set('views', path.join(__dirname, 'views'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(express.static(path.join(__dirname, 'public')))
    .use((req, res, next) => {
      res.locals.showBackIcon = true
      next()
    })
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
