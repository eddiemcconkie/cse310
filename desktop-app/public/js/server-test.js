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

// ipcRenderer.on('update-poll-responses', (event, pollResponses) => {
//     console.log(event, pollResponses);
// })

ipcRenderer.on('update-teams', (event, teamsCount) => {
    // document.querySelector('#teams-count').innerHTML = `
    // Red: ${teamsCount.red}
    // Blue: ${teamsCount.blue}
    // `;
    document.querySelector('#red-team-count').innerHTML = `Red: ${teamsCount.red}`;
    document.querySelector('#blue-team-count').innerHTML = `Blue: ${teamsCount.blue}`;
})

// document.querySelector('#submit').addEventListener('click', (event) => {
//     event.preventDefault();
//     let message = event.target.form.elements.msg.value;
//     // console.log(message);
//     // console.dir(event.target);
//     ipcRenderer.send('message', message);
// })


const screenSelect = document.querySelector('#screen');
// console.log(screenSelect);

const screens = ['homeclasses', 'poll', 'waitscreen', 'clicker', 'video'];
screens.forEach(screen => {
    const option = document.createElement('option');
    option.value = screen;
    option.innerText = screen;
    // document.querySelector('select').appendChild(option);
    screenSelect.appendChild(option);
});
screenSelect.addEventListener('change', (event) => {
    const value = event.target.value;
    // const option = document.createElement('option');
    // option.value = value;
    if (value === 'poll') {
        ipcRenderer.send('display-poll');
    } else {
        document.querySelector('#poll-results').innerHTML = '';
        ipcRenderer.send('change-screen-client', value);
    }

    const clickerTable = document.querySelector('#clicker-table');
    if (value === 'clicker') {
        clickerTable.hidden = false;
    } else {
        clickerTable.hidden = true;
    }
})




// Poll responses
ipcRenderer.on('update-poll-responses', (event, pollResponses) => {
    // console.log(pollResponses);
    const pollResults = document.querySelector('#poll-results');
    pollResults.innerHTML = '';

    pollResponses.questions.forEach(question => {
        const label = document.createElement('h2');
        label.innerText = question.label;
        pollResults.appendChild(label);
        question.responses.forEach(response => {
            const responseCount = document.createElement('p');
            responseCount.innerHTML = `${response.name} — Votes: ${response.count}`;
            pollResults.appendChild(responseCount);
        });
    });
})

