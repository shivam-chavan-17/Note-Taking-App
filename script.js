const addBtn = document.querySelector("#addBtn")
const main = document.querySelector("#main")

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea")
    console.log(notes)
    const data = []
    notes.forEach(
        (note) => {
            data.push(note.value)
        }
    )
    if (data.length === 0) {
        localStorage.removeItem("notes")
    } else {
        localStorage.setItem("notes", JSON.stringify(data))
    }
}

addBtn.addEventListener("click", function () {
    addNote()
})

const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
        <i class="save fa-solid fa-floppy-disk"></i>
        <i class="trash fa-solid fa-trash"></i>
    </div>
    <textarea>${text}</textarea>
    `;

    // To remove the note
    note.querySelector(".trash").addEventListener("click", function () {
        note.remove()
        saveNotes()
    })

    note.querySelector(".save").addEventListener("click", function () {
        saveNotes()
    })

    note.querySelector("textarea").addEventListener("focusout", function () { // autosave the text inside the notes
        saveNotes()
    })

    // to append the coontent on the page
    main.appendChild(note);
    saveNotes()
}

function saveRefresh() {
    const lsnotes = JSON.parse(localStorage.getItem("notes"))
    if (lsnotes === null) { // default a empty note remains in the page
        addNote()
    }
    else {
        lsnotes.forEach(
            (lsnotes) => {
                addNote(lsnotes)
            }
        )
    }
}
saveRefresh()







