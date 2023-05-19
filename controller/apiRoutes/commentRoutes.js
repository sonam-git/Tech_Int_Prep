const router = require("express").Router();
const { Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

// // fetches all comments for a given blog post
// router.get("/", async (req, res) => {
//   try {
//     const commentData = await Comment.findAll({
//       include: [User],
//     });
//     const comments = commentData.map((comment) => comment.get({ plain: true }));

//     console.log(comments);

//     res.render("single-post", {
//       comments,
//       layout: "dashboard",
//       logged_in: true,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });
// creates a new comment on a blog post.
router.post("/", withAuth, async (req, res) => {
  try {
    // Create a new comment with the provided data
    const newComment = await Comment.create({
      // comment_text: req.body.comment_text,
      // post_id: req.body.post_id, (instead of these two line of code just use ...req.body)
      ...req.body,
      user_id: req.session.user_id,
    });
    // Send a response with the new comment data
    res.status(200).json(newComment);
    console.log(newComment);
  } catch (err) {
    // Send an error response if something went wrong
    res.status(500).json(err);
  }
});

// DELETE route to delete a comment by ID
router.delete("/", withAuth, async (req, res) => {
  try {
    const commentId = req.params.id;

    // Find the comment by ID
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Delete the comment
    await comment.destroy();

    res.status(204).end(); // Successful deletion, send an empty response
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to delete the comment' });
  }
});


module.exports = router;
