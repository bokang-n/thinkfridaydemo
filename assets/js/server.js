const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // Serves static files from the root

// Load comments from JSON file
const loadComments = () => {
    try {
        const data = fs.readFileSync("comments.json", "utf8");
        return JSON.parse(data) || [];
    } catch (error) {
        console.error("Error loading comments:", error);
        return [];
    }
};

// Save comments to JSON file
const saveComments = (comments) => {
    fs.writeFileSync("comments.json", JSON.stringify(comments, null, 2));
};

// API route to get all comments
app.get("/api/comments", (req, res) => {
    const comments = loadComments();
    res.json(comments);
});

// API route to add a new comment
app.post("/api/comments", (req, res) => {
    const newComment = req.body;
    const comments = loadComments();
    comments.push(newComment);
    saveComments(comments);
    res.status(201).json(newComment);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
