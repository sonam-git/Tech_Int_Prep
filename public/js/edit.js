// Function that handles form submission
const newFormhandler = async function (event) {
  // prevents the default form submission behavior
  event.preventDefault();
  // retrieves the values of given form field from users input
  const post_id = document.querySelector('input[name="post-id"]').value;
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;
  console.log(body);
  // sends a request(PUT) to server using fetch method
  await fetch(`/api/posts/${post_id}`, {
    method: "PUT",
    // The request body is a JSON object containing the title and body of the post
    body: JSON.stringify({
      title,
      body,
    }),
    // field specifies the content type of the request as "application/json"
    headers: {
      "Content-Type": "application/json",
    },
  });
  // replaces the current page location with /dashboard.
  document.location.replace("/dashboard");
};

// Function to handle delete action
const deleteClickHandler = async () => {
  // retrieves the value of the post-id field
  const post_id = document.querySelector('input[name="post-id"]').value;

  // sends a DELETE request to the server at /api/post/${post_id} using the fetch method.
  await fetch(`/api/posts/${post_id}`, {
    method: "DELETE",
  });
  // replaces the current page location with /dashboard.
  document.location.replace("/dashboard");
};

// adds event listeners where the function within the argument is invoked once user click the button or submit the form
document
  .querySelector("#edit-post-form")
  .addEventListener("submit", newFormhandler);

document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteClickHandler);

 
