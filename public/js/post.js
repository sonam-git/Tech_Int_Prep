// function that handles new post
const newFormandler = async function (event) {
  // prevents the default form submission behavior
  event.preventDefault();
  // retrieves the values of given form field from users input
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;
  console.log("body=", body);
  // The fetch() function is used to send a POST request to the "/api/post" endpoint.
  await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // redirect the user to the "/dashboard" page.
  document.location.replace("/dashboard");
};

// event listener is added to the "submit" event of the form w
document
  .querySelector("#new-post-form")
  .addEventListener("submit", newFormandler);

