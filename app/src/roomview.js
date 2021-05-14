const electron = require('electron');
const { ipcRenderer } = electron;

const newRoomButton = document.querySelector('#new-room-button');
const newRoomForm = document.querySelector('#new-room-form');
newRoomForm.style.display = 'none';

let rooms = [];

// Shows the forms to add the new class.
newRoomButton.addEventListener('click', () => {
    newRoomButton.style.display = 'none';
    newRoomForm.style.display = 'block';
    document.querySelector('#room-name').focus();
});

// Hides the button to add a class
newRoomForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;
    // classes.push(form.roomName.value);
    createRoom(form.roomName.value, form.roomSection.value);
    refreshRooms();
    form.reset();
    newRoomButton.style.display = 'block';
    newRoomForm.style.display = 'none';
})

// Appends new Room to list and add buttons as well.
function refreshRooms() {
    // let allRooms = rooms.map((room) => {
    //     return `<li>${room.name} - ${room.section}</li>`;
    // }).join('');
    // document.querySelector('#room-list').innerHTML = allRooms;

    const roomList = document.querySelector('#room-list');
    roomList.innerHTML = '';
    rooms.forEach((room) => {
        const roomElement = document.createElement('div');
        roomElement.classList.add('room-element');
        
        const openButton = document.createElement('button');
        openButton.addEventListener('click', () => {
            ipcRenderer.send('LOAD_ROOM', room.id);
        });
        openButton.innerText = "Open Room";
        openButton.classList.add('room-button');

        const editButton = document.createElement('button');
        editButton.addEventListener('click', () => {
            ipcRenderer.send('EDIT_ROOM', room.id);
        });
        editButton.innerText = "Edit";
        editButton.classList.add('edit-button');

        // const title = document.createElement('h2');
        // title.innerText = room.name
        roomElement.innerHTML = `<h2>${room.name} - ${room.section}</h2>`;

        roomElement.appendChild(openButton);
        roomElement.appendChild(editButton);

        roomList.appendChild(roomElement);
        
    });
    
    // const startButton = document.querySelector('#start-button');
    
    // const editButton = document.querySelector('#edit-button');
    // editButton.addEventListener('click', () => {
    // });
    
    // const qrButton = document.querySelector('#qr-button');
    // qrButton.addEventListener('click', () => {
    //     ipcRenderer.send('DISPLAY_QR');
    // });
}


function createRoom(name, section) {
    const maxId = rooms.reduce((max, room) => {
        return Math.max(max, room.id);
    }, 0);
    const room = {
        id:maxId + 1,
        name:name,
        section:section,
        // semester:"",
        // year:"",
        folder:`./roomdata/${name}-${section}`,
        qr:`./qr/${5}`,
        settings:[],
    };
    rooms.push(room);
    console.log(rooms);
}

