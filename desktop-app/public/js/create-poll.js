const { ipcRenderer } = require('electron');

function addNewQuestion() {
    const questionsList = document.querySelector('#questions-list');
    const div = document.createElement('div');
    const question = document.createElement('input');
    question.type = 'text';
    question.classList.add('poll');
    question.classList.add('question');
    question.placeholder = 'Question';
    div.appendChild(question);
    const addResponseButton = document.createElement('button');
    addResponseButton.type = 'button';
    const deleteQuestion = document.createElement('button');
    deleteQuestion.innerText = '-';
    deleteQuestion.addEventListener('click', () => {
        div.remove();
        addResponseButton.remove();
    })
    div.appendChild(deleteQuestion);
    div.appendChild(document.createElement('br'));

    function addResponse() {
        const response = document.createElement('input');
        response.classList.add('poll');
        response.classList.add('response');
        response.placeholder = 'Response';
        div.appendChild(response);
        const br = document.createElement('br');
        const deleteResponse = document.createElement('button');
        deleteResponse.innerText = '-';
        deleteResponse.addEventListener('click', () => {
            response.remove();
            deleteResponse.remove();
            br.remove();
        })
        div.appendChild(deleteResponse);
        div.appendChild(br);
    }
    addResponse();
    addResponseButton.innerText = 'Add response';
    addResponseButton.addEventListener('click', addResponse);
    questionsList.appendChild(div);
    questionsList.appendChild(addResponseButton);
}

addNewQuestion();
document.querySelector('#add-question-button').addEventListener('click', addNewQuestion);

document.querySelector('#save-poll').addEventListener('click', () => {
    const data = Array.from(document.querySelectorAll('.poll'));
    // console.log(data);
    let json = {
        title: document.querySelector('#title').value,
        questions: []
    }
    let numQuestions = -1;
    data.forEach(element => {
        // console.log(element);
        if (element.classList.contains('question')) {
            numQuestions++;
            json.questions.push({
                label: element.value,
                responses: []
            })
        } else {
            json.questions[numQuestions].responses.push(element.value);
        }
    });
    // let jsonData = JSON.stringify(json);
    // document.querySelector('#json').value = jsonData;
    ipcRenderer.send('post-poll', json);
    document.querySelector('form').submit();
    // console.log(JSON.stringify(json));
    // console.log(json);
})

ipcRenderer.on('update-poll-responses', (event, pollResponses) => {
    console.log(pollResponses);
})
