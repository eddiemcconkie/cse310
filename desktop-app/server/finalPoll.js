function loadFinalPoll() {
    const page = document.querySelector('#page'),
          form = document.createElement('form'),
          div = document.createElement('div'),
          input = document.createElement('input'),
          label = document.createElement('label'),
          h2 = document.createElement('h2'),
          p = document.createElement('p'),
          submit = document.createElement('button')
    
    page.innerHTML = ''
    div.classList.add('inputContainer')
    form.method = "post"
    console.log(window.location)
    form.action = `http://${window.location.hostname}:5500/final-poll-results`
    form.addEventListener('submit', () => {
        setTimeout(() => {
            page.innerHTML = `
                <div class="allCentered">
                    <div>
                        <h1>Thank you for your response!</h1>
                        <p class="centered">You may now close this page</p>
                        <div id="loading">
                            <img src="images/dolphin.png" alt="dolphin loading">
                        </div>
                    </div>
                </div>`
        }, 1000);
    })
    input.name = 'appNameSuggestion'
    input.required = true
    input.id = 'appName'
    label.textContent = 'Suggest a Name For Our App'
    label.setAttribute('for', 'appName')
    h2.textContent = 'Suggest a Name For Our App!'
    h2.classList.add('centered')
    p.textContent = "We haven't come up with a name for our app yet, and we want your input! Please give us your ideas!"
    p.classList.add('centered')
    submit.textContent = 'Submit Suggestion'
    submit.type = 'submit'

    page.appendChild(h2)
    page.appendChild(p)
    div.appendChild(input)
    div.appendChild(label)
    form.appendChild(div)
    form.appendChild(submit)
    page.appendChild(form)
}