// import required modules and dependencies
const router = require("express").Router();
const { User } = require("../../models");

// This route handles the creation of a new user when a POST request is made to the root path ("/")
router.post("/", async (req, res) => {
  try {
    // uses the User.create() method to create a new user with the data provided in the request body.
    const userData = await User.create(req.body);
    // If the user creation is successful, the user ID and login status are saved in the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      // and the userData is returned as a response.
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// This route handles the login functionality when a POST request is made to the "/login" path
router.post("/login", async (req, res) => {
  console.log("req.body", req.body);
  try {
    // It first searches for a user in the database based on the provided username
    const userData = await User.findOne({
      // it ensures that only the post with the specified id will be found.
      where: {
        username: req.body.username,
      },
    });
    // If no user is found, an error response is returned.
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again" });
      return;
    }
    // If a user is found, it checks the password using the checkPassword() method defined in the User model.
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is invalid, an error response is returned
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again" });
      return;
    }
    // If the password is valid, the user ID, username, and login status are saved in the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      console.log("user", userData);

      // and the userData is returned as a response.
      res.status(200).json({ user: userData, message: "You are logged in now." });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//This  route handles the logout functionality when a POST request is made to the "/logout" path
router.post("/logout", (req, res) => {
  // It checks if the user is logged in by verifying the "logged_in" property in the session.
  if (req.session.logged_in) {
    // If the user is logged in, the session is destroyed
    req.session.destroy(() => {
      // a success response with status 204 is returned.
      res.status(204).end();
    });
  } else {
    console.log(err);
    //  If the user is not logged in, an error response with status 404 is returned.
    res.status(404).end();
  }
})

module.exports = router;
