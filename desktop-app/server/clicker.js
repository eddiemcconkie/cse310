function renderClicker() {
    const page = document.querySelector('#page');
    page.innerHTML = `<p>Team: <span id="team-color"></span></p>
    <button id="clicker">CLICK ME</button>`;

    document.querySelector('#clicker').addEventListener('click', () => {
        socket.emit('click');
    })

    document.querySelector('#team-color').innerHTML = teamColor;
    document.querySelector('#team-color').className = teamColor;

}