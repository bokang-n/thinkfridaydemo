const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Store comments in-memory (you can later connect to a database)
let comments = [];

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "thinkfriday")));

// API endpoint to get all comments
app.get("/api/comments", (req, res) => {
    res.json(comments);
});

// API endpoint to add a new comment
app.post("/api/comments", (req, res) => {
    const { user, text, date } = req.body;
    const newComment = { user, text, date };
    comments.push(newComment);
    res.status(201).json(newComment);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
