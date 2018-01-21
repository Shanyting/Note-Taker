const yargs = require('yargs');
const argv = yargs
  .command("add", "Adds a new note", {
    title: {
      describe: "Title of note",
      alias: "t",
      demandOption: true
    },
    body: {
      describe: "Body of note",
      alias: "b",
      demandOption: true
    }
  })
  .command("remove", "Remove a note", {
    title: {
      describe: "Title of note",
      alias: "t",
      demandOption: true
    }
  })
  .command("list", "List all notes")
  .command("read", "read a note", {
    title: {
      describe: "Title of note",
      alias: "t",
      demandOption: true
    }
  })
  .help()
  .alias("help", "h")
  .argv;

const notes = require("./notes.js")

const command = argv._[0];
if (command === "add") {
  const title = argv.title;
  const body = argv.body;
  const noteAdded = notes.addNote(title, body);
  if (noteAdded) {
    console.log("Note added");
  }
  else {
    console.log("Note already exists");
  }
}
else if (command === "list") {
  notes.listNotes();
}
else if (command === "read") {
  const title = argv.title;
  notes.readNote(title);
}
else if (command === "remove") {
  const title = argv.title;
  notes.removeNote(title);
}
