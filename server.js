const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 1400;
const app = express();
const dbJSON = require("./db/db.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
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
// app.get("/assets/css/styles.css", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
// });

// app.get("/assets/js/index.js", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
// });


app.get("/api/notes", (req, res) => {
    return res.json(storedNotes);
});
// POST and DELETE
app.post("/api/notes", (req, res) => {
    const writeNote = req.body;
    const id = storedNotes.length;
    writeNote.id = id + 1;
    storedNotes.push(writeNote);
    noteTracking(storedNotes);
    return res.json(storedNotes);
});

// app.delete("/api/notes/:id", (req, res) => {
// console.log(id);
// fs.readFile("db/db.json", "UTF-8", (error, data) => {
//       if (error) throw error;
//       const id = req.params.id;
//       const notes = JSON.parse(data);
//       console.log(notes);
//       const temp = notes.filter((note) => note.id != id);
//       console.log(temp);
//       fs.writeFile("db/db.json", JSON.stringify(temp), (error, data) => {
//       if (error) throw error;
//       res.send(data);
//     });
// });
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.listen(PORT, () => {
    console.log("Listening at http://localhost:" + PORT);
});
