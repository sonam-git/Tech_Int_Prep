const router = require("express").Router();
const { Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

// fetches all comments for a given blog post
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [User],
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    console.log(comments);

    res.render("single-post", { comments, layout: "dashboard", logged_in: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// creates a new comment on a blog post. 
router.post("/", withAuth, async (req, res) => {

  try {
    const addComment = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.json(addComment);
    console.log(addComment)
  } catch (err) {
    res.status(500).json(err);
  }

  
});

module.exports = router;