// import required modules and dependencies
const router = require("express").Router();

//import from models folder
const { Post, User, Comment } = require("../models");

//Import custom middleware
const withAuth = require("../utils/auth");

//Get request for the homepage & renders the "home" view and passes the "main" layout and a "logged_in" flag to the view.
router.get("/", async (req, res) => {
  try {
       res.render("home", {
      layouts: "main",
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// handles the GET request for the login page 
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to to the homepage ("/").
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
// Otherwise, it renders the "login" view.
  res.render("login");
});

//  handles the GET request for the signup page 
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to to the homepage ("/").
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
// Otherwise, it renders the "signup" view.
  res.render("signup");
});

// handles the GET request for the "/aboutUs" page & renders the "aboutUs" view, 
// passing the "main" layout and a "logged_in" flag to the view.
router.get("/aboutUs", async (req, res) => {
  try {
       res.render("aboutUs", {
      layouts: "main",
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// handles the GET request for the "/myDashboard" page.
router.get("/myDashboard", async (req, res) => {
  try {
     // retrieves all posts from the database, including their associated users
     const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    // The retrieved data is then passed to the "myDashboard" view along with the "dashboard" layout and the "logged_in" flag.
      res.render("myDashboard", {
      posts,
      layouts: "dashboard",
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// retrieves a single post with the given ID from the database
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: [User, { model: Comment, include: User }],
    });
    const commentData = await Comment.findAll({
      include: [User],
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    console.log(comments);
    if (postData) {
      const post = postData.get({ plain: true });
      console.log(post);
      res.render("single-post", { post, comments, logged_in: req.session.logged_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;