// Student client page

// Grab the username from the url
const urlParams = new URLSearchParams(window.location.search)
const username = urlParams.get('username')

const socket = io()

socket.emit('joined-class', username)
// Enable raising and lowering hands. This will be available in all class activities
let handRaised = false
const raiseHand = document.querySelector('#raise-hand')
raiseHand.addEventListener('click', () => {
  handRaised = !handRaised
  raiseHand.querySelector('span').textContent = handRaised
    ? 'Lower Hand'
    : 'Raise Hand'
  if (handRaised) {
    socket.emit('raise-hand', username)
  } else {
    socket.emit('lower-hand')
  }
})

// Set up team info for the clicker game
let teamColor = ''
let teamsCount = { red: 0, blue: 0 }
let start = false

socket.on('display-poll', (pollData) => {
  renderPoll(pollData)
})

socket.on('set-color', (color) => {
  teamColor = color
  // document.querySelector('#team-color').innerHTML = color;
  // document.querySelector('#team-color').className = color;
})

socket.on('teamsCount', (count) => {
  teamsCount = count
})

// Screens for each class activity
const screens = {
  waitscreen: renderWaitScreen,
  poll: renderPoll,
  video: renderVideo,
  clicker: renderClicker
}

// Automatically load the home classes view
screens['waitscreen']()

socket.on('change-screen-client', (screen) => {
  screens[screen]()
  if (screen === 'clicker') {
    socket.emit('updateTeamsNow', teamsCount)
  }
})
