
/* eslint-disable indent */
/* eslint-disable prettier/prettier */

var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var passport = require("./config/passport");


require("dotenv").config();
var express = require("express");
var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var PORT = process.env.PORT || 8080;


// Require models for sync
var db = require("./models");

// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));


var db = require("./models");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
