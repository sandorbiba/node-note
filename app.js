const fs = require("fs");
//const _ = require('lodash');
const yargs = require("yargs");

const notes = require("./notes.js");

const argv = yargs
  .command("add", "Add new note", {
    title: {
      describe: "Title of note.",
      demand: true, //Is require?
      alias: "t" //short version of command
    },
    body: {
      describe: "Body of note.",
      demand: true,
      alias: "b"
    }
  })
  .command("list", "List of all notes.")
  .command("read", "Read a note.", {
    title: {
      describe: "Title of note.",
      demand: true,
      alias: "t"
    }
  })
  .command("remove", "Remove a note.", {
    title: {
      describe: "Title of note.",
      demand: true,
      alias: "t"
    }
  });

var command = argv._[0];

if (command === "add") {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log("Note created");
    notes.logNote(note);
  } else {
    console.log("Note title taken");
  }
} else if (command === "list") {
  var allNotes = notes.getAll();
  console.log(`Printig ${allNotes.length} note(s).`);
  allNotes.forEach(note => {
    notes.logNote(note);
  });
} else if (command === "read") {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log("Note found");
    notes.logNote(note);
  } else {
    console.log("Note not found");
  }
} else if (command === "remove") {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? "Note was removed" : "Note not fond";
  console.log(message);
} else {
  console.log("Command not recognized");
}
