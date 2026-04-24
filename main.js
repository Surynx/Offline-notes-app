if("serviceWorker" in navigator) {

    navigator.serviceWorker.register("./sw.js").then(()=>{

        console.log("service worker registered");
    }).catch((err)=>{

        console.log("error in registeration")
    })
}

const notesList = document.getElementById("notesList");

window.onload = () => {
    renderNotes();
};

function getNotes() {
    return JSON.parse(localStorage.getItem("notes")) || [];
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote() {
    const input = document.getElementById("note");
    const text = input.value.trim();

    if (!text) return;

    const notes = getNotes();
    notes.push(text);
    saveNotes(notes);

    input.value = "";
    renderNotes();
}

function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    renderNotes();
}

function renderNotes() {
    const notes = getNotes();
    notesList.innerHTML = "";

    notes.forEach((note, index) => {
        const div = document.createElement("div");
        div.className = "note";

        div.innerHTML = `
            <span>${note}</span>
            <button onclick="deleteNote(${index})">✕</button>
        `;

        notesList.appendChild(div);
    });
}