// Teacher display page

const { ipcRenderer } = require('electron');

let clickCount = {red: 0, blue: 0};
let pageOn = 'waitscreen'

function lastStudentJoined(username) {
    document.querySelector('#last-student-joined').innerText = username + ' has joined the pod!';
}

ipcRenderer.on('joined-class', (event, username) => {
    lastStudentJoined(username);
})

const raisedHandsList = document.querySelector('#raised-hands');
ipcRenderer.on('update-raised-hands', (event, raisedHands) => {
    if (raisedHands.length > 0) {
        raisedHandsList.innerHTML = `<h3>Raised Hands</h3>` + raisedHands.map(student => `<p>${student.username}</p>`).join('');
        raisedHandsList.hidden = false;
    } else {
        raisedHandsList.innerText = '';
        raisedHandsList.hidden = true;
    }
})

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
    document.querySelector('#red-team-count').innerHTML = `Red`;
    document.querySelector('#blue-team-count').innerHTML = `Blue`;
})

// document.querySelector('#submit').addEventListener('click', (event) => {
//     event.preventDefault();
//     let message = event.target.form.elements.msg.value;
//     // console.log(message);
//     // console.dir(event.target);
//     ipcRenderer.send('message', message);
// })


const screenSelect = document.querySelector('#screenPicker');
const screens = ['waitscreen', 'poll', 'video', 'clicker'];
screens.forEach(screen => {
    let radio = document.createElement('input');
        radio.value = screen;
        radio.name = "screenName"
        radio.type = "radio"
        radio.checked = (pageOn === screen)

    let span = document.createElement('span')
        span.textContent = screen[0].toUpperCase()+screen.substring(1, screen.length)

    let label = document.createElement('label')
        label.appendChild(radio)
        label.appendChild(span)
    
    
    screenSelect.appendChild(label);
});
screenSelect.addEventListener('change', (event) => {
    const value = event.target.value;
    pageOn = value
    if (value === 'poll') {
        ipcRenderer.send('display-poll');
    } else {
        document.querySelector('#poll-results').innerHTML = '';
        ipcRenderer.send('change-screen-client', value);
    }

    const clickerDisplay = document.querySelector('#clicker-display');
    if (value === 'clicker') {
        clickerDisplay.classList.remove('hide')
    } else {
        clickerDisplay.classList.add('hide')
    }
})
ipcRenderer.on('changeScreen', () => {
    if (pageOn === 'poll') {
        ipcRenderer.send('display-poll');
    } else {
        document.querySelector('#poll-results').innerHTML = '';
        ipcRenderer.send('change-screen-client', pageOn);
    }

    const clickerDisplay = document.querySelector('#clicker-display');
    if (pageOn === 'clicker') {
        clickerDisplay.classList.remove('hide')
    } else {
        clickerDisplay.classList.add('hide')
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

        const totalVotes = question.responses.reduce((prev, total) => {
            return prev + total.count
        }, 0)

        question.responses.forEach(response => {
            const responseBar = document.createElement('div');
            
            responseBar.classList.add('poll-stats-bar')
            responseBar.style.width = `${(response.count/totalVotes)*100}%`;
            responseBar.innerHTML = `<p><span>${response.count}</span> — ${response.name}</p>`;

            pollResults.appendChild(responseBar);
        });
    });
})

