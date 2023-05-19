// import require modules
const { User } = require("../models");

const userData = [
  {
    username: "SJ",
    password: "password",
  },
  {
    username: "Dandar",
    password: "abcdefghi",
  },
  {
    username: "TJ",
    password: "12345678",
  },
];

// uses the User.bulkCreate method provided by Sequelize to create multiple user records in the database at once.
const seedUsers = () => User.bulkCreate(userData, { individualHooks: true }); //any hooks defined in the User model will be triggered for each individual user being created.

module.exports = seedUsers;
