// Student client page

const socket = io();

// const { renderPoll } = require('./renderPoll.js');
// import { renderPoll } from './renderPoll.js';

socket.on('message', (message) => {
    document.querySelector('#message').innerHTML = message;
})

socket.on('display-poll', (pollData) => {
    renderPoll(pollData);
})

socket.on('set-color', (color) => {
    document.querySelector('#team-color').innerHTML = color;
    document.querySelector('#team-color').className = color;
})

document.querySelector('#clicker').addEventListener('click', () => {
    socket.emit('click');
})