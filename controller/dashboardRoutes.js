// imports the required dependencies & modules
const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

// GET route that handles the root path ("/"). It requires authentication using the withAuth middleware.
router.get("/", withAuth, async (req, res) => {
  console.log(req.session);
  try {
    //  fetches all posts from the database, including their associated users.
    const postData = await Post.findAll({
      include: [User],
    });
 // retrieve a plain JavaScript object containing only the data of the post, without any Sequelize-specific metadata or methods using({plain: true});
    const posts = postData.map((post) => post.get({ plain: true }))
    .sort((a,b)=> new Date(b.createdAt)- new Date(a.createdAt)); //The sort method is used to sort the posts array based on the createdAt property.;
    console.log(posts);
// it renders the "userPost" template, passing the fetched posts as well as layout and authentication information to the template.
    res.render("userPost", {
      posts,
      layout: "dashboard",
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route that handles the "/new" path. It also requires authentication.
router.get("/new", withAuth, (req, res) => {
  // This route renders the "newPost" template, passing the layout information to the template.
  res.render("newPost", {
    layout: "dashboard",
  });
});

//  GET route that handles the "/edit/:id" path. It requires authentication and expects an id parameter in the URL. 
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    // It tries to find a post with the specified ID in the database. 
    const postData = await Post.findByPk(req.params.id);
     // If the post is found, 
    if (postData) {
      // retrieve a plain JavaScript object containing only the data of the post, without any Sequelize-specific metadata or methods.
      const post = postData.get({ plain: true });
      console.log(post);
      // it renders the "editposts" template, passing the layout information and the fetched post to the template.
      res.render("editposts", {
        layout: "dashboard",
        post, //to display the corresponding post
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    // If an error occurs during the database operation, the user is redirected to the "login" page.
    res.redirect("login");
  }
});

module.exports = router;