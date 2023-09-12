const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(morgan("combined"));
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);

const db = mongoose.connect("mongodb://localhost:27017/notes-app", console.log("Connection db Success"));
const Note = require("./models/note");

app.get("/notes", (req, res) => {
    Note.find({}, "title description", function (error, notes) {
        if (error) {
            console.error(error);
        }
        res.send({
            notes: notes,
        });
    }).sort({ _id: -1 });
});

app.post("/add_note", (req, res) => {
    const db = req.db;
    const title = req.body.title;
    const description = req.body.description;
    const new_note = new Note({
        title: title,
        description: description,
    });

    new_note.save(function (error) {
        if (error) {
            console.log(error);
        }
        res.send({
            success: true,
        });
    });
});

app.put("/notes/:id", (req, res) => {
    const db = req.db;
    Note.findById(req.params.id, "title description", function (error, note) {
        if (error) {
            console.error(error);
        }

        note.title = req.body.title;
        note.description = req.body.description;
        note.save(function (error) {
            if (error) {
                console.log(error);
            }
            res.send({
                success: true,
            });
        });
    });
});

app.delete("/notes/:id", (req, res) => {
    const db = req.db;
    Note.remove(
        {
            _id: req.params.id,
        },
        function (err, note) {
            if (err) res.send(err);
            res.send({
                success: true,
            });
        }
    );
});

app.get("/notes/:id", (req, res) => {
    const db = req.db;
    Note.findById(req.params.id, "title description", function (error, note) {
        if (error) {
            console.error(error);
        }
        res.send(note);
    });
});

app.post("/notes/search", async (req, res) => {
    let search = req.body.search;
    let find = await Note.find({ title: { $regex: new RegExp(".*" + search + ".*", "i") } })
        .limit(10)
        .exec();
    res.send(find);
});

// Handle production

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./public/")));
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, "./public/", "index.html"));
    });
}

// Proxy

const { createProxyMiddleware } = require("http-proxy-middleware");
app.use("/", createProxyMiddleware({ target: "http://localhost:8080", changeOrigin: true }));

app.listen(process.env.PORT || 8071);
