// import require modules and depedencies
const express = require("express");
const path = require("path");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controller");
const helpers = require("./utils/helpers");

// Sequelize configuration file that establishes a connection to the database.
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// An instance of the Express application is created using express() and assigned to the app variable.
const app = express();

// The PORT variable
const PORT = process.env.PORT || 3001;
// An instance of the Handlebars template engine is created
const hbs = exphbs.create({ helpers });

// setup express to use sessions
const sessionConfig = {
  secret: "secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// set up Express to use Handlebars as the template engine,
app.engine("handlebars", hbs.engine);
// set the default template engine to "handlebars".
app.set("view engine", "handlebars");

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware is added to serve static files from the "public" directory.
app.use(express.static(__dirname + "/public"));

// create a req.session object for every request that comes into our server
app.use(session(sessionConfig));

// connection routes
app.use(routes);

//accessing msql to connect to the db
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`\n Now listenening ${PORT} http://localhost:${PORT}`)
  );
});
