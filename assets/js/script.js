const commentForm = document.getElementById("commentForm");
const newComment = document.getElementById("newComment");
const userNameInput = document.getElementById("userName");

// Fetch existing comments from the server
window.onload = function() {
    fetch("/api/comments")
        .then(response => response.json())
        .then(comments => {
            comments.forEach(comment => displayComment(comment));
        });
};

if (commentForm && newComment && userNameInput) {
    commentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const commentText = newComment.value.trim();
        const userName = userNameInput.value.trim();
        const currentDate = new Date().toLocaleDateString();

        if (commentText && userName) {
            const commentData = { user: userName, text: commentText, date: currentDate };

            // Send the new comment to the server
            fetch("/api/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentData),
            })
            .then(response => response.json())
            .then(comment => {
                displayComment(comment);
            });

            // Clear form fields
            newComment.value = "";
            userNameInput.value = "";
        } else {
            alert("Please provide both your name and a comment!");
        }
    });
}

// Function to display a comment on the page
function displayComment(comment) {
    const commentElement = document.createElement("div");
    commentElement.classList.add("media-grid");

    commentElement.innerHTML = `
        <div class="media">
            <a class="com" href="#">
                <img src="assets/images/testi1.jpg" class="img-fluid radius-image" width="100px" alt="placeholder image">
            </a>
            <div class="media-body comments-grid-right">
                <h5>${comment.user}</h5> <!-- User's name -->
                <ul class="p-0">
                    <li>${comment.date}</li> <!-- Date -->
                    <li><a href="#comment" class="">Reply</a></li>
                </ul>
                <p>${comment.text}</p> <!-- Comment text -->
            </div>
        </div>
    `;

    document.getElementById("comments-grids").appendChild(commentElement);
}
