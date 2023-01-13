const addNoteForm = document.getElementById("add-note-form");
const notesContainer = document.getElementById("notes-container");

function addNote(event) {
    event.preventDefault();
    const noteText = document.getElementById("note-text").value;
    if (!noteText) return; // check if the input is empty
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = 
        `
        <h2>${noteText}</h2>
        <button class="star-note">&#11088;</button>
        <button class="delete-note">Delete</button>
        `
        ;
    document.getElementById("note-text").value = "";
    note.draggable = true;
    notesContainer.append(note);
    note.addEventListener('dragstart', handleDragStart);
    note.addEventListener('dragover', handleDragOver);
    note.addEventListener('drop', handleDrop);
}
addNoteForm.addEventListener("submit", addNote);

function deleteNote(event) {
    if (event.target.classList.contains("delete-note")) {
        event.target.parentNode.remove();
    }
}
notesContainer.addEventListener("click", deleteNote);

function starNote(event) {
    if (event.target.classList.contains("star-note")) {
        const note = event.target.parentNode;
        notesContainer.insertBefore(note, notesContainer.firstChild);
        if (note.classList.contains("starred-note")) {
            note.classList.remove("starred-note");
        } else {
            note.classList.add("starred-note");
        }
    }
}
notesContainer.addEventListener("click", starNote);

let draggedItem;

function handleDragStart(event) {
    draggedItem = event.target;
}

function handleDragEnd(event) {
    event.target.style.opacity = '1';
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    if (draggedItem === event.target) {
        return;
    }
    if(event.target.classList.contains('notes-container')){
        event.target.appendChild(draggedItem);
    }
    event.target.parentNode.insertBefore(draggedItem, event.target);
}

function saveNote() {
    const notes = document.querySelectorAll('#notes-container');
    const notesArray = [];
    notes.forEach(note => {
        notesArray.push(note.innerHTML);
    });
    localStorage.setItem("notes", JSON.stringify(notesArray));
}


function loadNotes() {
    const notesString = localStorage.getItem("notes");
    console.log(notesString);
    if (notesString) {
        const notesArray = JSON.parse(notesString);
        notesArray.forEach(noteHtml => {
            const newNote = document.createElement('reload');
            newNote.innerHTML = noteHtml;
            document.querySelector('#notes-container').appendChild(newNote);
        });
    }
}
window.addEventListener('unload', saveNote)
window.addEventListener('load', loadNotes);


