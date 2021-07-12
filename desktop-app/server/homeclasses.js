function renderHomeClasses() {
    // -------------change screen title -----------------
    document.querySelector('title').textContent = 'My classes'
    
    // -------------add main section-------------------------
    const page = document.querySelector('#page')
    page.innerHTML = '';
    
    //----------- add 'My classes' main heading -------------------- 
    let h1 = document.createElement('h1')
    h1.textContent = 'My Classes'
    page.appendChild(h1)
    
    // --------- create and add classes to main --------------
    let cse310Div = document.createElement('div'),
        cse225Div = document.createElement('div'),
        rel200Div = document.createElement('div')
    
    cse310Div.classList.add("mobile-class")
    cse225Div.classList.add("mobile-class")
    rel200Div.classList.add("mobile-class")

    cse310Div.innerHTML = '<h2>CSE 310</h2><h4>Applied Programming</h4><span>Section 1</span>'
    cse225Div.innerHTML = '<h2>CIT 225</h2><h4>Database Design & Development</h4><span>Section 1</span>'
    rel200Div.innerHTML = '<h2>REL 200</h2><h4>Eternal Families</h4><span>Section 12</span>'

    page.appendChild(cse310Div)
    page.appendChild(cse225Div)
    page.appendChild(rel200Div)
    
    //--------create & add + image & added extra dolphin noise ------------
    let addIcon = document.createElement('img')
    
    addIcon.classList.add('mobile-add-class')
    addIcon.src = 'images/add_icon_100.png'
    
    let dolphinNoise = new Audio('audio/dolphin1.mp3')
    addIcon.addEventListener('click', () => {
        dolphinNoise.play()
    })
    
    page.appendChild(addIcon)
}