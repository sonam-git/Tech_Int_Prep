// function that handles/Add new post
const newFormandler = async function (event) {
  // prevents the default form submission behavior
  event.preventDefault();
  // retrieves the values of given form field from users input
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;
  console.log("body=", body);
  // display alert if empty input
  if (!title|| !body) {
    return alert('Question and Answer must be provided');
    
  }
  // The fetch() function is used to send a POST request to the "/api/post" endpoint.
  await fetch("/api/posts/new", {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // Display the success message
  const successMessage = document.createElement('p');
  successMessage.textContent = 'The Question has been added to the dashboard';
  successMessage.classList.add('text-success', 'text-black');
  document.querySelector('#addQA').appendChild(successMessage);

  // Wait for 3 seconds and then redirect to /dashboard
  setTimeout(() => {
    document.location.replace("/dashboard");
  }, 2000);
};

// event listener is added to the "submit" event of the form w
document
  .querySelector("#new-post-form")
  .addEventListener("submit", newFormandler);

