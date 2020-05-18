/* eslint-disable indent */
/* eslint-disable prettier/prettier */

require("dotenv").config();

var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var compression = require("compression");
// var Sequelize = require('sequelize');
var passport = require("./config/passport");
var db = require("./models"); // Require models for sync
var app = express();
app.use(compression());
var SequelizeStore = require("connect-session-sequelize")(session.Store);

var sessionStore = new SequelizeStore({
  db: db.sequelize,
});
sessionStore.sync({
  force: true,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    saveUninitialized: false,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
  })
);

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

var PORT = process.env.PORT || 8080;

//Authentication
app.use(passport.initialize());
app.use(passport.session());

// Data parsing
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Static directory
app.use("/public", express.static(__dirname + "/public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


db.sequelize
  .sync({
    force: false,
  })
  .then(function () {
    app.listen(PORT, function () {
      console.log("App listening on PORT " + PORT);
    });
  });

var compression = require("compression");

app.use(compression());
