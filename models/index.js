// import require modules
const User = require('./User');
const Post = require('./Post');
const Comment = require("./Comment");

// one-to-many relationship between the User and Post models
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'  //specifies that if a user is deleted, all associated posts should be deleted as well
});
// User has many comments through user_id
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
// a post belongs to a user. A
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//Post has many comments link post_id
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

//Comments belong to user through user_id
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//Comments belong to posts through post_id
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

module.exports = { User, Post, Comment };