const { ipcRenderer } = require('electron')

function newElem(elemType) {
    return document.createElement(elemType)
}

function addNewQuestion() {
    let questionsList = document.querySelector('#questionsList')
    let div = newElem('div')
    let withRemove = newElem('div')
        withRemove.className = 'withRemove'
    let questionContainer = newElem('div')
        questionContainer.className = 'inputContainer'
    let questionLabel = newElem('label')
        questionLabel.textContent = 'Question'

    let question = newElem('input')
        question.type = 'text'
        question.classList.add('poll')
        question.classList.add('question')
        question.required = true

    
    questionContainer.appendChild(question)
    questionContainer.appendChild(questionLabel)
    withRemove.appendChild(questionContainer)

    let addResponseButton = newElem('button')
        addResponseButton.type = 'button'
    
    let deleteQuestion = newElem('button')
        deleteQuestion.innerText = '-'
        deleteQuestion.className = 'remove'
        deleteQuestion.addEventListener('click', () => {
            div.remove()
            addResponseButton.remove()
        })
    withRemove.appendChild(deleteQuestion)
    div.appendChild(newElem('hr'))
    div.appendChild(withRemove)

    function addResponse() {
        let response = newElem('input')
            response.classList.add('poll')
            response.classList.add('response')
            response.required = true
        let responseContainer = newElem('div')
            responseContainer.className = 'inputContainer'
        let responseLabel = newElem('label')
            responseLabel.textContent = 'Response'
        let withRemove2 = newElem('div')
            withRemove2.className = 'withRemove'

        responseContainer.appendChild(response)
        responseContainer.appendChild(responseLabel)
        withRemove2.appendChild(responseContainer)

        let deleteResponse = newElem('button')
            deleteResponse.innerText = '-'
            deleteResponse.className = 'remove'
            deleteResponse.addEventListener('click', () => {
                withRemove2.remove()
                br.remove()
            })
        
        withRemove2.appendChild(deleteResponse)
        div.appendChild(withRemove2)
    }
    addResponse()
    addResponseButton.innerText = 'Add response'
    addResponseButton.addEventListener('click', addResponse)
    questionsList.appendChild(div)
    questionsList.appendChild(addResponseButton)
}

addNewQuestion()
document.querySelector('#add-question-button').addEventListener('click', addNewQuestion)

document.querySelector('#save-poll').addEventListener('click', () => {
    let data = Array.from(document.querySelectorAll('.poll'))
    // console.log(data)
    let json = {
        title: document.querySelector('#title').value,
        questions: []
    }
    let numQuestions = -1
    data.forEach(element => {
        // console.log(element)
        if (element.classList.contains('question')) {
            numQuestions++
            json.questions.push({
                label: element.value,
                responses: []
            })
        } else {
            json.questions[numQuestions].responses.push(element.value)
        }
    })
    // let jsonData = JSON.stringify(json)
    // document.querySelector('#json').value = jsonData
    ipcRenderer.send('save-poll', json)
    // document.querySelector('form').submit()


    // console.log(JSON.stringify(json))
    // console.log(json)
})


// // Poll responses
// ipcRenderer.on('update-poll-responses', (event, pollResponses) => {
//     // console.log(pollResponses)
//     let pollResults = document.querySelector('#poll-results')
//     pollResults.innerHTML = ''

//     pollResponses.questions.forEach(question => {
//         let label = newElem('h2')
//         label.innerText = question.label
//         pollResults.appendChild(label)
//         question.responses.forEach(response => {
//             let responseCount = newElem('p')
//             responseCount.innerHTML = `${response.name} — Votes: ${response.count}`
//             pollResults.appendChild(responseCount)
//         })
//     })
// })

