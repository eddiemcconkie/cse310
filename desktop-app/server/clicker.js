function renderClicker() {
    const page = document.querySelector('#page');
    page.innerHTML = `
        <div id="clicker">
            <p>Team: <span id="team-color"></span></p>
            <div class="dolphin ${teamColor}"></div>
        </div>`;

    document.querySelector('#clicker').addEventListener('click', () => {
        socket.emit('click');
    })

    document.querySelector('#team-color').innerHTML = teamColor;
    document.querySelector('#team-color').className = teamColor;
}