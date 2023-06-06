//  ******************** ADD NEW COMMENT ********************* //
const commentFormHandler = async function (event) {
  // prevents the default form submission behavior
  event.preventDefault();

  // extracts the post ID and comment text from the form inputs
  const post_id = document.querySelector('input[name="post-id"]').value;
  const comment_text = document.querySelector(
    'input[name="comment-body"]'
  ).value;
  // if empty comment is added
  if (!comment_text ) {
    return alert('Comment must be provided');
  }

  console.log(comment_text);
  console.log(post_id);
  // sends an HTTP POST request to the server to create a new comment with the extracted data only if user input some text
  if (comment_text) {
    await fetch("/api/comments/addComment", {
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

//  ******************** UPDATE COMMENT ********************* //
// Get all update buttons
const updateButtons = document.querySelectorAll(".edit-btn");

// Iterate over each update button
updateButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    event.preventDefault();

    // Get the comment ID from the data attribute
    const commentId = button.getAttribute("data-comment-id");

    // Get the comment text element
    const commentTextElement = document.querySelector(`#comment-${commentId}`);

    // Get the comment text
    const commentText = commentTextElement.textContent;

    // Create a new editable element
    const editableComment = document.createElement("textarea");
    editableComment.classList.add("edit_area");
    editableComment.type = "text";
    editableComment.value = commentText;

    // Replace the comment text element with the editable element
    commentTextElement.parentNode.replaceChild(
      editableComment,
      commentTextElement
    );

    // Create a new update button
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.classList.add("btn-outline-primary"); // Bootstrap button class
    updateButton.classList.add("btn");

    // Replace the original update button with the new one
    button.parentNode.replaceChild(updateButton, button);

    // Focus on the editable element
    editableComment.focus();

    // Set attributes for the textarea element based on screen size
    const setTextareaAttributes = () => {
      const screenWidth = window.innerWidth;
      let rows, cols;

      // Adjust the attributes based on screen size
      if (screenWidth < 576) {
        rows = 3;
        cols = 35;
      } else if (screenWidth >= 576 && screenWidth < 992) {
        rows = 4;
        cols = 45;
      } else {
        rows = 5;
        cols = 60;
      }

      editableComment.rows = rows;
      editableComment.cols = cols;
    };

    // Call the function initially to set the attributes
    setTextareaAttributes();

    // Call the function whenever the window is resized
    window.addEventListener('resize', setTextareaAttributes);

    // Handle the update comment event
    const updateComment = async () => {
      // Get the updated comment text
      const updatedComment = editableComment.value;

      // Make a PUT request to update the comment
      try {
        const response = await fetch(`/api/comments/${commentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment_text: updatedComment }),
        });

        if (response.ok) {
          // Replace the editable element with the updated comment text
          const newCommentTextElement = document.createElement("span");
          newCommentTextElement.id = `comment-${commentId}`;
          newCommentTextElement.className = "comment-text";
          newCommentTextElement.textContent = updatedComment;

          editableComment.parentNode.replaceChild(
            newCommentTextElement,
            editableComment
          );

          // Replace the update button with the original one
          updateButton.parentNode.replaceChild(button, updateButton);

          const messageContainer = document.getElementById("updateCommentText");
          const messageTemplate = Handlebars.compile("{{message}}");
          const messageHtml = messageTemplate({
            message: "Your comment has been successfully updated",
          });
          messageContainer.innerHTML = messageHtml;
          
          // Hide the message after 3 seconds
          setTimeout(() => {
            messageContainer.innerHTML = "";
               // replaces the current page location with /dashboard.
           document.location.reload();
  
          }, 3000);
  
        } else {
          throw new Error("Failed to update comment");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while updating the comment");
      }
    };

    // Update the comment when the update button is clicked
    updateButton.addEventListener("click", async (event) => {
      event.preventDefault();
      await updateComment();
    });
  });
});

//  ******************** DELETE COMMENT ********************* //
const deleteCommentHandler = async function (event) {
  event.preventDefault();

  if (event.target.classList.contains("delete-btn")) {
    const commentId = event.target.getAttribute("data-comment-id");
    console.log(commentId);
    // Send an HTTP DELETE request to the server to delete the comment
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Comment deleted successfully, refresh the page
      alert("Comment deleted successfully.");
      document.location.reload();
    } else {
      // Display an error message if the deletion fails
      alert("You are only allowed to delete the comment you posted.");
    }
  }
};

const handleUpdateComment = async (event) => {
  event.preventDefault();

  const commentId = event.target.getAttribute("data-comment-id");
  console.log(commentId);
  const updatedCommentInput = event.target.parentNode.querySelector(
    "input[name='updated-comment']"
  );

  if (!updatedCommentInput) {
    console.error("Updated comment input field not found.");
    return;
  }

  const updatedComment = updatedCommentInput.value;

  try {
    const response = await fetch(`/api/comments/updateComment/${commentId}`, {
      method: "PUT",
      body: JSON.stringify({ updatedComment }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      location.reload();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error(error);
    const messageContainer = document.getElementById("messageContainer");
    messageContainer.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
  }
};

// addEventListener method attaches the commentFormHandler function to the "submit",it is executed whenever the user submits a comment.
document
  .querySelector("#new-comment-form")
  .addEventListener("submit", commentFormHandler);

// Attach the deleteCommentHandler to the comment delete buttons
document.addEventListener("DOMContentLoaded", () => {
  const commentList = document.querySelector(".comment-list");
  if (commentList) {
    commentList.addEventListener("click", deleteCommentHandler);
  }
});