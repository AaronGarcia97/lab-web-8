// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();

var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// LAB DATA
let reservations = [];
let waitlist = [];
const LIMIT = 5;


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// APIS
// waitlist -> checa waitlist
// tables -> checa tables y si hay cupo hace reservacion si no regresa error
// clear -> borra una table de tables
app.post("/api/tables", function(req, res) {
  const newReservation = req.body;
  let isBooked = false;
  if (reservations.length < LIMIT) { // Added to reservations
    reservations.push(newReservation);
    isBooked = true;
  } else { // Added to waitlist
    waitlist.push(newReservation);
  }
  return res.json(isBooked);
});

app.get("/api/tables", function(req, res) {
  return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

// Clears everythign in our "local db"
app.post("/api/clear", function(req, res) {
  waitlist = reservations = [];
  return res.json(true);
});

// SERVER
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});