// Function that handles the logout
const logout = async function () {
  // request is sent to the "/api/user/logout" URL, using the POST method, and fetch function
  const response = await fetch("/api/users/logout", {
    method: "POST",
    // header specifying that the content type is JSON.
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    // if the response is ok,redirects the user to the homepage ("/").
    document.location.replace("/");
  } else {
    // If the response is not successful, the failed message is displayed
    alert("Failed to log out");
  }
};
// event listener is added to the html element
document.querySelector("#logout-link").addEventListener("click", logout);
