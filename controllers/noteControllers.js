//  API ROUTES

// module.exports.getAllNotes = getAllNotes;
// module.exports.createNotes = createNotes;
// module.exports.getSingleNote = getSingleNote;
// module.exports.loadNotes = loadNotes;
// module.exports.saveNotes = saveNotes;
// module.exports.removeNote = removeNote;
// module.exports.addNote = addNote;
// module.exports.logNote = logNote;
// module.exports.checkNote = checkNote;

// delete requests

// require express and fs
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// use body parser to get the data from the client
app.use(bodyParser.urlencoded({ extended: true }));

//  parse the data

// read the data from the db.json file and transform it into an array of objects
exports.loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("db/db.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

// turn the data from loadNotes into a variable aray of objects
var notes = exports.loadNotes();

// create a function that creates an id for the note
function uuidv4() {
  return notes.length + 1;
}

// create a delete request to /api/notes/:id
exports.removeNote = (req, res) => {
  // get the id from the url
  const id = req.params.id;
  // find the note with the id
  const note = notes.find((note) => note.id === id);
  // if the note is found
  if (note) {
    // remove the note from the notes array
    notes = notes.filter((note) => note.id !== id);
    // log the note to the console
    console.log(`Deleted note ${note}`);
    // send a response to the client
    // delete the note from the db.json file
    exports.saveNotes();
    res.json(note);
  } else {
    // if the note is not found
    // send a 404 response to the client
    res.status(404).end();
  }
};

//  GET REQUEST

//  create get request to get single note
exports.getSingleNote = (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
};

// get the notes from the db.json file and send them to the browser and function to a variable
exports.getAllNotes = (req, res) => {
  // read the db.json file
  fs.readFile("db/db.json", function (err, data) {
    if (err) {
      throw err;
    }
    // parse the data into an array of objects
    notes = JSON.parse(data);
    // send the notes back to the browser
  }); // end of fs.readFile
  // send the notes back to the browser
  res.json(notes);
}; // end of app.get

//  POST REQUEST

//  receive the data from the client
exports.addNote = (req, res) => {
  // get the data from the client
  const newNote = req.body;
  //    turn newNote into an object
  newNote.id = String(uuidv4());
  // add the new note to the notes array

  // add the note to the notes array
  notes.push(newNote);
  // log the note to the console
  console.log(`Added note ${newNote}`);
  //    add information to db.json
  exports.saveNotes();

  // send the note back to the client
  res.json(newNote);
}; // end of app.post
// save the notes to the db.json file
exports.saveNotes = () => {
  // turn the notes array into a string
  const notesJSON = JSON.stringify(notes);
  // write the notes to the db.json file
  fs.writeFileSync("db/db.json", notesJSON);
}; // end of saveNotes
// create a function to log the note to the console
exports.logNote = (note) => {
  console.log(`Logged note ${note}`);
}; // end of logNote
// create a function to check the note
exports.checkNote = (note) => {
  // if the note is empty
  if (note.title.trim().length === 0 || note.body.trim().length === 0) {
    // return false
    return false;
  } else {
    // return true
    return true;
  }
}; // end of checkNote
