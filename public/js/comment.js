
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

// Function to handle comment deletion
const deleteCommentHandler = async function (event) {
  event.preventDefault();

  if (event.target.classList.contains("delete-btn")) {
    const commentId = event.target.getAttribute("data-comment-id");
console.log(commentId)
    // Send an HTTP DELETE request to the server to delete the comment
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Comment deleted successfully, refresh the page
      alert ("Comment deleted successfully.");
      document.location.reload();
    } else {
      // Display an error message if the deletion fails
      alert("You are only allowed to delete the comment you posted.");
    }
  }
};


// addEventListener method attaches the commentFormHandler function to the "submit",it is executed whenever the user submits a comment.
document
  .querySelector("#new-comment-form")
  .addEventListener("submit", commentFormHandler);


 // Attach the deleteCommentHandler to the comment delete buttons
document
.querySelector(".comment-list")
.addEventListener("click", deleteCommentHandler);


  

// const deleteComment = async (commentId) => {
//   try {
//     const response = await fetch(`/api/comments/${commentId}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       alert ("Comment deleted successfully.");
//       console.log("Comment deleted successfully.");
//       // Handle any further actions or UI updates after successful deletion
//       document.location.reload();
//     } else {
//      alert("You are only allowed to delete the comment you posted.");
//       // Handle the error or display an error message to the user
//     }
//   } catch (error) {
//     console.log("An error occurred while deleting the comment:", error);
//     // Handle the error or display an error message to the user
//   }
// };

// // Attach the event listener to the delete buttons
// document.addEventListener("click", function (event) {
//   if (event.target.classList.contains("delete-btn")) {
//     const commentId = event.target.getAttribute("data-comment-id");
//     deleteComment(commentId);
//   }
// }); 