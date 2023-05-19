// import required modules and dependencies
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes.js");

//mount the userRoutes and postRoutes on specific paths.
// if user hit /user then mounts the userRoutes
router.use("/users", userRoutes);
// if user hit /post then mounts the postRoutes
router.use("/posts", postRoutes);
//  Routes for comment-related functionality
router.use("/comments", commentRoutes);

module.exports = router;