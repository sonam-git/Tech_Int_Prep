const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/addComment", withAuth, async (req, res) => {
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

// Delete a comment by ID
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async(req,res) => {
  try {
    const updatedComment = await Comment.update(req.body,{
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      },
      returning: true // Add this option to return the updated comment
    });
    const updatedCommentData = updatedComment[1][0]; // Access the updated comment data
    res.json(updatedCommentData);
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})


module.exports = router;
