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
      title: "Tech Int Prep",
      username: req.session.username,
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

// retrieves a single post with the given ID from the database
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: [
        User,
        {
          model: Comment,
          include: User,
        },
      ],
    });
    console.log(postData.post)
    const post = postData.get({ plain: true });
    console.log("POSTTTTTTTT");
    console.log(post);
    const postComments = post.comments.map((comment) => {
    const isUpdated = comment.createdAt.getTime() !== comment.updatedAt.getTime();

      if (comment.user_id == req.session.user_id) {
        return {
          ...comment,
          canEdit: true,
          isUpdated: isUpdated,
        };
      }
      return {
        ...comment,
        canEdit: false,
        isUpdated: isUpdated,
      };
    });
    console.log("POST COMMENENTNTNTNTNT");
    res.render("single-post", {
      post,
      postComments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
