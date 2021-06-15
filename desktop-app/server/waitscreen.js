function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const page = document.querySelector('#page');
removeAllChildNodes(page);
const heading = document.createElement('h3');
heading.textContent = 'Welcome to CSE 310!';
const para = document.createElement('p');
para.textContent = 'Please wait for the teacher to begin.';
page.appendChild(heading);
page.appendChild(para);

