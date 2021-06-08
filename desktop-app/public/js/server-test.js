const { ipcRenderer } = require('electron');

document.querySelector('#submit').addEventListener('click', (event) => {
    event.preventDefault();
    let message = event.target.form.elements.msg.value;
    // console.log(message);
    // console.dir(event.target);
    ipcRenderer.send('message', message);
})