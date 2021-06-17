function renderWaitScreen() {
    const page = document.querySelector('#page');
    page.innerHTML = `
        <div class="allCentered">
            <div>
                <h1>Welcome to CSE 310!</h1>
                <p class="centered">Please wait for the teacher to begin.</p>
                <div id="loading">
                    <img src="images/dolphin.png" alt="dolphin loading">
                </div>
            </div>
        </div>`;
}
