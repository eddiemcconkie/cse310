// export default function renderPoll(pollData) {
function renderPoll(pollData) {
    // console.dir(pollData);
    // console.log(pollData.title, pollData.questions);

    const page = document.querySelector('#page');
    page.innerHTML = '';

    // Destructure poll data
    const { title, questions } = pollData;

    const h2 = document.createElement('h2');
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
    // When the form is submitted, return the poll data to the serverl
    submit.addEventListener('click', (event) => {
        let selects = Array.from(document.querySelectorAll('select'));
        let responses = selects.map((select) => parseInt(select.value));
        // console.log(responses);
        // console.log(socket);
        socket.emit('poll-respond', responses);
    })
    poll.appendChild(document.createElement('br'));
    poll.appendChild(submit);
    page.appendChild(poll);

}