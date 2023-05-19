// Import require modules
const seedUsers = require("./seedUsers");
const seedPosts = require("./seedPosts");
const sequelize = require("../config/connection");

const seedAll = async () => {
  //ensures that the database is dropped and recreated every time the script runs
  await sequelize.sync({ force: true });
  // After the database sync, seedUsers() and seedPosts() are called sequentially using await
  await seedUsers();
  await seedPosts();
  // exit the script with a success status code (0).
  process.exit(0);
};
// invoke the function
seedAll();
