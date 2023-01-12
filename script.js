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
        `;
    document.getElementById("note-text").value = "";
    note.draggable = true;
    notesContainer.appendChild(note);
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

function handleDragStart(e) {
    draggedItem = e.target;
}

function handleDragEnd(e) {
    e.target.style.opacity = '1';
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    if (draggedItem === e.target) {
        return;
    }
    if(e.target.classList.contains('notes-container')){
        e.target.appendChild(draggedItem);
    }
    e.target.parentNode.insertBefore(draggedItem, e.target);
}

// Saving a new note
function saveNote(note) {
    // Get the existing notes from local storage
    let notes = JSON.parse(localStorage.getItem("notes")) ||  [];

    // Add the new note to the array
    notes.push(note);

    // Save the updated array to local storage
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Retrieving the notes
function getNotes() {
    return JSON.parse(localStorage.getItem("notes")) || [];
}