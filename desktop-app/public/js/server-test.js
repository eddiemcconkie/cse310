// Teacher display page

const { ipcRenderer } = require('electron');

let clickCount = {red: 0, blue: 0};

function displayClickCount() {
    document.querySelector('#red-click-count').innerHTML = clickCount.red;
    document.querySelector('#blue-click-count').innerHTML = clickCount.blue;
}
displayClickCount();

ipcRenderer.on('add-click-count', (event, team) => {
    // clickCount++;
    clickCount[team]++;
    displayClickCount();
});

ipcRenderer.on('update-teams', (event, teamsCount) => {
    // document.querySelector('#teams-count').innerHTML = `
    // Red: ${teamsCount.red}
    // Blue: ${teamsCount.blue}
    // `;
    document.querySelector('#red-team-count').innerHTML = `Red: ${teamsCount.red}`;
    document.querySelector('#blue-team-count').innerHTML = `Blue: ${teamsCount.blue}`;
})

document.querySelector('#submit').addEventListener('click', (event) => {
    event.preventDefault();
    let message = event.target.form.elements.msg.value;
    // console.log(message);
    // console.dir(event.target);
    ipcRenderer.send('message', message);
})