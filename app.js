// require express and body-parser
const express = require("express");
const bodyParser = require("body-parser");

// import the router
const router = require("./routes/noteRoutes");

const htmlRoutes = require("./public/assets/js/index.js");

// require fs to read and write to files
const fs = require("fs");

const path = require("path");

//  initialize express
const app = express();

app.use(express.json());

// route api routes to /api/notes
app.use("/api/notes", router);

// serving up html files

app.use("/", htmlRoutes);

// export the app
module.exports = app;
