function renderPoll(pollData) {

    const page = document.querySelector('#page');
    page.innerHTML = '';

    // Destructure poll data
    const { title, questions } = pollData;

    const h2 = document.createElement('h2');
    h2.classList.add('centered')
    h2.innerHTML = title;
    page.appendChild(h2);

    const poll = document.createElement('form');
    // Add each question to the poll
    questions.forEach(question => {
        // Destructure data for each question
        const { label, responses } = question;
        const h4 = document.createElement('h4');
        h4.innerText = label;
        poll.appendChild(h4);
        // Add each of the selection options to the question
        const select = document.createElement('select');
        // select.name = 'responses[]';
        let value = 0;
        responses.forEach(response => {
            const option = document.createElement('option');
            // const responseLabel = document.createElement('label');
            // responseLabel.innerHTML = response;
            option.innerText = response;
            // console.log(value);
            option.value = value++;
            select.appendChild(option);
            // select.appendChild(responseLabel);
        });
        poll.appendChild(select)
    });

    const submit = document.createElement('button');
    submit.type = 'button';
    submit.innerText = 'Submit';
    // submit.type = 'submit';
    // When the form is submitted, return the poll data to the server
    submit.addEventListener('click', (event) => {
        let selects = Array.from(document.querySelectorAll('select'));
        let responses = selects.map((select) => parseInt(select.value));
        // console.log(responses);
        // console.log(socket);
        socket.emit('poll-respond', responses);
        page.innerHTML = `
            <div class="allCentered">
                <div>
                    <h1>Thank you for your response!</h1>
                    <p class="centered">Please wait</p>
                    <div id="loading">
                        <img src="images/dolphin.png" alt="dolphin loading">
                    </div>
                </div>
            </div>`;
    })
    poll.appendChild(document.createElement('br'));
    poll.appendChild(submit);
    page.appendChild(poll);

}