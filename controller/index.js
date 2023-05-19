// import required modules and dependencies
const router = require("express").Router();

// imports the required route handlers
const apiRoutes = require("./apiRoutes");
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");

// when the user hit '/' then mounts the homeRoutes
router.use("/", homeRoutes);
// when the user hit '/api' then mounts the apiRoutes
router.use("/api", apiRoutes);
// when the user hit '/dashboard' then mounts the dashboardRoutes
router.use("/dashboard", dashboardRoutes);

module.exports = router;