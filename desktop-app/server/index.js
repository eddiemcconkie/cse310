// Student client page

// import "homescreen.js"

const socket = io();

socket.on('message', (message) => {
    document.querySelector('#message').innerHTML = message;
})

socket.on('set-color', (color) => {
    document.querySelector('#team-color').innerHTML = color;
    document.querySelector('#team-color').className = color;
})

document.querySelector('#clicker').addEventListener('click', () => {
    socket.emit('click');
})