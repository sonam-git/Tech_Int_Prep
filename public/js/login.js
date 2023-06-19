// Function that handles user login
const loginFormHandler = async (event) => {
  // prevents the default form submission behavior
  event.preventDefault();
  // retrieves the values of given form field from users input
  const usernameEl = document.querySelector("#username-login");
  const passwordEl = document.querySelector("#password-login");

  // checks if both the username and password elements exist before proceeding with the login process.
  if (usernameEl && passwordEl) {
    // If the elements exist, an HTTP POST request is sent to "/api/user/login" using the fetch function
    const response = await fetch("/api/users/login", {
      method: "POST",
      // The request body contains the username and password values obtained from the input elements.
      body: JSON.stringify({
        username: usernameEl.value.trim().toLowerCase(),
        password: passwordEl.value,
      }),
      // field specifies the content type of the request as "application/json"
      headers: { "Content-Type": "application/json" },
    });
    // Log the username and password values for debugging purposes
    // console.log("FIND THIS", usernameEl.value, passwordEl.value);
    if (response.ok) {
      console.log("response", response);
      // If login is successful, redirect to the dashboard
      document.location.replace("/");
    } else {
      console.error();
      // If login fails, display an error message using SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Wrong username or password",
      });
    }
  }
};
// add event listener, when user click on login button, the corresponding function will be invoked
document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);
