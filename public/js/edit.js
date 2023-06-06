// Function that handles form submission
const newFormhandler = async function (event) {
  // prevents the default form submission behavior
  event.preventDefault();
  // retrieves the values of given form field from users input
  const post_id = document.querySelector('input[name="post-id"]').value;
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;
  console.log(body);
  // display alert if empty input
  if (!title|| !body) {
    return alert('Question and Answer must be provided');
  }

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
    // Display the success message
    const successMessage = document.createElement('p');
    successMessage.textContent = 'The Q&A has been updated';
    successMessage.classList.add('text-success', 'text-white');
    document.querySelector('#edit-post-form').appendChild(successMessage);
  
    // Wait for 3 seconds and then redirect to /dashboard
    setTimeout(() => {
      document.location.replace("/dashboard");
    }, 2000);

};

// Function to handle delete action
const deleteClickHandler = async () => {
  // retrieves the value of the post-id field
  const post_id = document.querySelector('input[name="post-id"]').value;

  // sends a DELETE request to the server at /api/post/${post_id} using the fetch method.
  await fetch(`/api/posts/${post_id}`, {
    method: "DELETE",
  });
  // Display the success message
  const successMessage = document.createElement('p');
  successMessage.textContent = 'The Q&A has been deleted';
  successMessage.classList.add('text-success', 'text-white');
  document.querySelector('#edit-post-form').appendChild(successMessage);

  // Wait for 3 seconds and then redirect to /dashboard
  setTimeout(() => {
    document.location.replace("/dashboard");
  }, 3000);
};

// adds event listeners where the function within the argument is invoked once user click the button or submit the form
document
  .querySelector("#edit-post-form")
  .addEventListener("submit", newFormhandler);

document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteClickHandler);

 
