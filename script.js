const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

const saveNotes = () => {
    const notes = document.querySelectorAll(".note");
    const data = [];
    notes.forEach((note) => {
        const title = note.querySelector(".title-input").value;
        const text = note.querySelector("textarea").value;
        data.push({ title, text });
    });
    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
};

addBtn.addEventListener("click", function () {
    addNote();
});

const addNote = (noteData = { title: "", text: "" }) => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
        <input type="text" class="title-input" placeholder="Note Title" value="${noteData.title}">
        <i class="save fa-solid fa-floppy-disk"></i>
        <i class="trash fa-solid fa-trash"></i>
    </div>
    <textarea>${noteData.text}</textarea>
    <button class="download-btn">Download</button>
    `;

    note.querySelector(".trash").addEventListener("click", function () {
        note.remove();
        saveNotes();
    });

    note.querySelector(".save").addEventListener("click", function () {
        saveNotes();
    });

    note.querySelector("textarea").addEventListener("focusout", function () {
        saveNotes();
    });

    note.querySelector(".download-btn").addEventListener("click", function () {
        downloadNote(note);
    });

    main.appendChild(note);
    saveNotes();
};

const downloadNote = (note) => {
    const title = note.querySelector(".title-input").value || "Untitled Note";
    const text = note.querySelector("textarea").value;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${title}.txt`;
    a.click();
};

const saveRefresh = () => {
    const lsnotes = JSON.parse(localStorage.getItem("notes"));
    if (lsnotes === null) {
        addNote();
    } else {
        lsnotes.forEach((noteData) => {
            addNote(noteData);
        });
    }
};
saveRefresh();
