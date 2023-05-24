// Function to handle sign up action
const signupFormHandler = async (event) => {
  // prevents the default form submission behavior
  event.preventDefault();
  // retrieves the values of given form field from users input
  const username = document
    .querySelector("#username-signup")
    .value.trim()
    .toLowerCase();
  const password = document.querySelector("#password-signup").value.trim();
  // checks if both username and password have a truthy value
  if (username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      // redirects the user to the "/dashboard" page
      document.location.replace("/dashboard");
    } else {
      // displays an error message using the Swal.fire library
      Swal.fire({
        icon: "error",
        title: "Please choose a password with at least 8 characters",
      });
    }
  }
};
// an event listener is added to the form
//  When the form is submitted, the signupFormHandler function is called.
document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
