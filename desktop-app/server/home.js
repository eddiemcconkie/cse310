// Student client page

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

const socket = io();

socket.emit('joined-class', username);

// const { renderPoll } = require('./renderPoll.js');
// import { renderPoll } from './renderPoll.js';

// socket.on('message', (message) => {
//     document.querySelector('#message').innerHTML = message;
// })
let teamColor = '';
let teamsCount = { red: 0, blue: 0 };
let start = false;

socket.on('display-poll', (pollData) => {
    renderPoll(pollData);
})

socket.on('set-color', (color) => {
    teamColor = color;
    // document.querySelector('#team-color').innerHTML = color;
    // document.querySelector('#team-color').className = color;
})

socket.on('teamsCount', (count) => {
    teamsCount = count
})

const screens = {
    'homeclasses': renderHomeClasses,
    'waitscreen': renderWaitScreen,
    'poll': renderPoll,
    'video': renderVideo,
    'clicker': renderClicker,
    'finalPoll': loadFinalPoll
}

// Automatically load the home classes view
screens['homeclasses']()

socket.on('change-screen-client', (screen) => {
    screens[screen]();
    if (screen === 'clicker') {
        socket.emit('updateTeamsNow', teamsCount)
    }
})

// document.querySelector('#clicker').addEventListener('click', () => {
//     socket.emit('click');
// })