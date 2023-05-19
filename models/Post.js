//  imports the necessary dependencies
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// defines the Post class that extends the Model class provided by Sequelize.
class Post extends Model {}

// defines the structure and behavior of the Post model.
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      // defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize, //the instance of Sequelize that represents the database connection.
    timestamps: true, //adds the createdAt and updatedAt fields to the model,
    freezeTableName: true, //ensures that the table name in the database matches the model name exactly
    underscored: true, //uses snake_case for the automatically generated attributes
    modelName: "post", //sets the model name to "post" explicitly.
  }
);

module.exports = Post;
