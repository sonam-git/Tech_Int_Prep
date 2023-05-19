//  imports the necessary dependencies
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
// const uuidv4 = require('uuid');
const sequelize = require("../config/connection");

// defines the User class that extends the Model class provided by Sequelize.
class User extends Model {
  // compare a provided password (loginPw) with the hashed password stored in the User instance.
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// defines the structure and behavior of the User model.
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      // defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    // These hooks are executed before creating or updating a User instance.
    hooks: {
      async beforeCreate(newUserData) {
        console.log("intercepted data:", newUserData);
        // hash the password before storing it in the database.
        newUserData.password = await bcrypt.hash(newUserData.password, 10);

        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        console.log("intercepted data:", updatedUserData);
        // hash the password before storing it in the database.
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );

        return updatedUserData;
      },
    },
    sequelize, //the instance of Sequelize that represents the database connection.
    timestamps: false, //disable the default timestamps (createdAt and updatedAt) for the model.
    freezeTableName: true, //ensures that the table name in the database matches the model name exactly
    underscored: true, //uses snake_case for the automatically generated attributes
    modelName: "user", //sets the model name to "post" explicitly.
  }
);

module.exports = User;
