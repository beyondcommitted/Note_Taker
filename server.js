const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 1400;
const app = express();
const dbJSON = require("./db/db.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storedNotes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/db/db.json"), (err, data) => {
    if (err) throw err;
  })
);

const noteTracking = (storedNotes) => {
  fs.writeFileSync(
    path.join(__dirname, "/db/db.json"),
    JSON.stringify(storedNotes),
    (err) => {
      if (err) throw err;
    }
  );
};

// route paths matching the request to endpoints and transfering the file at the given path and setting a response based on the file extension
app.get("/assets/css/styles.css", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
});

app.get("/assets/js/index.js", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  return res.json(storedNotes);
});