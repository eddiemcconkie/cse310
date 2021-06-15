// -------------change screen title -----------------
let title = document.querySelector('title')
title.textContent = 'My classes'

// -------------add main section-------------------------
let body = document.querySelector('body'),
    main = document.createElement('main')
body.appendChild(main)

//----------- add 'My classes' main heading -------------------- 
let h1 = document.createElement('h1')
main.appendChild(h1)
h1.textContent = 'My Classes'

// --------- create and add classes to main --------------
let cse310Div = document.createElement('div'),
    cse225Div = document.createElement('div'),
    rel200Div = document.createElement('div'),
    cse310 = document.createElement('h2'),
    cse225 = document.createElement('h2'),
    rel200 = document.createElement('h2')

cse310.textContent = 'CSE 310 - Applied Programming: Section 1'
cse225.textContent = 'CIT 225 - Database Design & Development: Section 1'
rel200.textContent = 'REL 200 - Eternal Families: Section 12'

main.appendChild(cse310Div)
cse310Div.appendChild(cse310)
main.appendChild(cse225Div)
cse310Div.appendChild(cse225)
main.appendChild(rel200Div)
cse310Div.appendChild(rel200)

//--------create & add + image & added extra dolphin noise ------------
let picture = document.createElement('picture'),
    addIcon = document.createElement('img')

addIcon.src = 'add_icon_100.png'
addIcon.setAttribute('onclick', "playAudio('dolphin1.mp3')")

main.appendChild(picture)
picture.appendChild(addIcon)

// --------- function play dolphon noise---------
function playAudio(url){
    new Audio(url).play();
}
