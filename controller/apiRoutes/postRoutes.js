// import required modules and dependencies
const router = require("express").Router();
const { Post,Like } = require("../../models");
const withAuth = require("../../utils/auth");

// This route creates a new post.
router.post("/", withAuth, async (req, res) => {
  try {
    //  create a new post with the data received in the request body.
    const newPost = await Post.create({
      // spread the properties of the req.body object into new object (in this case "newPost")
      ...req.body,
      // The req.session.user_id is used to associate the post with the currently authenticated user.
      user_id: req.session.user_id,
    });
    // If the post creation is successful, it responds with a JSON object containing the newly created post.
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//This route updates an existing post with the given id
router.put("/:id", withAuth, async (req, res) => {
  try {
    // It uses the Post model's update method to update the post's data with the data received in the request body.
    const [postData] = await Post.update(req.body, {
      // The where clause ensures that only the post with the id specified in the URL will be updated.
      where: {
        id: req.params.id,
      },
    });
    // if update operation affects any rows or if the post exists and is successfully updated
    if (postData > 0) {
      res.status(200).end();
    } else {
      // Otherwise no rows are effected and it responds with a 404 status code, indicating that no post was found with the given id
      res.status(404).end();
    }
  } catch (err) {
    //  If there's a server error,
    res.status(500).json(err);
  }
});

//This route deletes an existing post with the given id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // uses the Post model's destroy method to delete the post based on the provided id
    const postData = await Post.destroy({
      // it ensures that only the post with the specified id will be deleted.
      where: {
        id: req.params.id,
      },
    });
    //  If no post is found with the given id, it responds with a 404 status with the message:
    if (!postData) {
      res.status(404).json({ message: "No Post found with this id!" });
      return;
    }
    // If the deletion is successful, it responds with a JSON object containing the deleted post data.
    res.status(200).json(postData);
  } catch (err) {
    //  If there's a server error,
    res.status(500).json(err);
  }
});

// LIKE COUNT ROUTER
router.post('/:postId/like', async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment the likes count
    post.likes += 1;
    await post.save();
   
    res.status(200).json({ likes: post.likes });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
