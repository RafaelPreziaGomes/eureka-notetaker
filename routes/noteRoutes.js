// require express and body-parser
const express = require("express");

// import the notecontroller to be used in this file
const noteController = require("./../controllers/noteControllers");

const router = express.Router();

router.route("/").get(noteController.getAllNotes).post(noteController.addNote);

router
  .route("/:id")
  .get(noteController.getSingleNote)
  .delete(noteController.removeNote);

//   export the router
module.exports = router;
