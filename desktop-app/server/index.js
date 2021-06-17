// Student client page

const socket = io();

// const { renderPoll } = require('./renderPoll.js');
// import { renderPoll } from './renderPoll.js';

// socket.on('message', (message) => {
//     document.querySelector('#message').innerHTML = message;
// })
let teamColor = '';

socket.on('display-poll', (pollData) => {
    renderPoll(pollData);
})

socket.on('set-color', (color) => {
    teamColor = color;
    // document.querySelector('#team-color').innerHTML = color;
    // document.querySelector('#team-color').className = color;
})

const screens = {
    'homeclasses': renderHomeClasses,
    'poll': renderPoll,
    'waitscreen': renderWaitScreen,
    'clicker': renderClicker,
    'video': renderVideo
}

socket.on('change-screen-client', (screen) => {
    // console.log(screen);
    screens[screen]();
})

// document.querySelector('#clicker').addEventListener('click', () => {
//     socket.emit('click');
// })