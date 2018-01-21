const fs = require("fs");

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync("notes-data.json");
    return JSON.parse(notesString);
  }
  catch (e) {
    return [];
  }
}

const saveNotes = (notes) => {
  fs.writeFileSync("notes-data.json", JSON.stringify(notes));
}

const addNote = (title, body) => {
  const note = {
    title,
    body
  }
  const notes = fetchNotes();
  if (notes.every(n => n.title != note.title)) {
    notes.push(note);
    saveNotes(notes);
    return true;
  }
  else {
    return false;
  }
}

const listNotes = () => {
  const notes = fetchNotes();
  console.log("Title               Body");
  for (n in notes) {
    // make space between the titles and bodies
    let space = " ".repeat(20-notes[n].title.length);
    console.log(notes[n].title + space + notes[n].body);
  }
}

const readNote = (title) => {
  const notes = fetchNotes();
  let n = notes.findIndex(note => note.title === title);
  if (n < 0) {
    console.log("A note with this title does not exist");
  }
  else {
    let space = " ".repeat(20-notes[n].title.length);
    console.log(notes[n].title + space + notes[n].body);
  }
}

const removeNote = (title) => {
  const notes = fetchNotes();
  let n = notes.findIndex(note => note.title === title);
  if (n < 0) {
    console.log("A note with this title does not exist");
  }
  else {
    notes.splice(n, 1);
    saveNotes(notes);
    console.log("Note removed");
  }
}

module.exports = {
  addNote,
  readNote,
  listNotes,
  removeNote
}
