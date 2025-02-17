document.addEventListener("DOMContentLoaded", loadNotes);

function addNote() {
    let noteText = document.getElementById("noteInput").value;
    if (noteText.trim() === "") return;
    
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));

    document.getElementById("noteInput").value = "";
    loadNotes();
}

function loadNotes() {
    let notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";
    
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach((note, index) => {
        let noteElement = document.createElement("div");
        noteElement.className = "note";
        noteElement.innerHTML = `${note} <button class="delete-btn" onclick="deleteNote(${index})">X</button>`;
        notesContainer.appendChild(noteElement);
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    
    let noteElements = document.querySelectorAll(".note");
    let noteToDelete = noteElements[index];

    noteToDelete.style.opacity = "0";
    noteToDelete.style.transform = "translateX(-20px)";
    setTimeout(() => {
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    }, 300);
}
