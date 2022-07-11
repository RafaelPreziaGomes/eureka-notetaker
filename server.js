// import the app
const app = require("./app");

// // listen for requests on port 3000 and log to console when requests are received
app.listen(process.env.PORT, function () {
  console.log("Server listening on port 3000!");
});
