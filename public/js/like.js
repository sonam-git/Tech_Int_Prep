// ############################## Function to handle like button  ##############################################

const handleLike = async (postId) => {
  try {
    // Send a POST request to the server endpoint that handles post likes
    const response = await fetch(`/api/posts/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // If the request is successful, parse the response JSON
      const data = await response.json();

      // Update the like count on the page
      const likesCountSpan = document.getElementById("likesCount");
      likesCountSpan.textContent = data.likes;

      // Disable the like button after clicking
      const likeButton = document.getElementById("likeButton");
      likeButton.style.display = 'none';
      
      localStorage.setItem(`${window.location.pathname}`, "liked");

      // Display the "Thanks for liking the post" message
      const messageContainer = document.getElementById("messageContainer");
      const messageTemplate = Handlebars.compile("{{message}}");
      const messageHtml = messageTemplate({
        message: "Thanks for liking this post 👍",
      });
      messageContainer.innerHTML = messageHtml;

      // Hide the message after 3 seconds
      setTimeout(() => {
        messageContainer.innerHTML = "";
      }, 3000);
    } else if (response.status === 400) {
      const data = await response.json();
      console.log(data.message);
    } else {
      throw new Error("Request failed");
    }
  } catch (error) {
    console.error("Error liking post:", error);
  }
};
// Add event listener to the like button
const likeButton = document.getElementById("likeButton");
if (localStorage.getItem(`${window.location.pathname}`)) {
  likeButton.style.display = 'none';
} else {
  likeButton.addEventListener("click", () => {
    const postId = likeButton.getAttribute("data-post-id");
    handleLike(postId);
  });
}
