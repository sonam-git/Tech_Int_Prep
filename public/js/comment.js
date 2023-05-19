
const commentFormHandler = async function (event) {
  // prevents the default form submission behavior
  event.preventDefault();

  // extracts the post ID and comment text from the form inputs
  const post_id = document.querySelector('input[name="post-id"]').value;
  const comment_text = document.querySelector('input[name="comment-body"]').value;

  console.log(comment_text)
  console.log(post_id)
  // sends an HTTP POST request to the server to create a new comment with the extracted data only if user input some text
  if (comment_text) {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  // replaces the current page location with /dashboard.
  document.location.reload();
  }
};

// Get all delete buttons
const deleteButtons = document.querySelectorAll('.delete-comment-btn');

// Function to handle delete action
const deleteCommentHandler = async () => {
  // retrieves the value of the post-id field
  const post_id = document.querySelector('input[name="post-id"]').value;

  // sends a DELETE request to the server at /api/post/${post_id} using the fetch method.
  await fetch(`/api/comments/${post_id}`, {
    method: "DELETE",
  });
  // replaces the current page location with /dashboard.
  document.location.replace("/dashboard");
};

deleteButtons.addEventListener('click',deleteCommentHandler);

// addEventListener method attaches the commentFormHandler function to the "submit",it is executed whenever the user submits a comment.
document
  .querySelector("#new-comment-form")
  .addEventListener("submit", commentFormHandler);


  

  