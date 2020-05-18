/* eslint-disable prettier/prettier */
var db = require("../models");
// var express = require("express");
// var router = express.Router();
var path = require("path"); // Requiring path to so we can use relative routes to our HTML files

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

var compression = require("compression");
var express = require("express");

var app = express();

// compress all responses
app.use(compression());

module.exports = function (app) {
  app.get("/", function (req, res) {
    // res.sendFile(path.join(__dirname, "../public/html/index.html"));
    res.render("index", {
      pageTitle: "Home - Volunteer",
    });
  });

  app.get("/privacy", (req, res) => {
    res.render("privacy", {
      layout: false,
    });
  });

  app.get("/signup", (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/html/signup.html"));
    res.render("signup", {
      layout: "signupMain",
    });
  });

  app.get("/login", function (req, res) {
    res.render("login");
  });

  // If a user who is not logged in tries to access this route they will be redirected to the login page
  app.get("/NewEvent", isAuthenticated, (req, res) => {
    res.render("newEvent");
  });

  app.get("/volunteer", isAuthenticated, (req, res) => {
    db.Events.findAll({}).then(function (dbEvents) {
      console.log(dbEvents);
      res.render("volunteer", {
        pageTitle: "Volunteer Events",
        Authenticated: true,
        events: dbEvents.map((event) => event.toJSON()),
      });
    });
  });

  app.get("/member", isAuthenticated, function (req, res) {
    db.User.findAll({}).then(function (dbEvents) {
      // res.sendFile(path.join(__dirname,"../public/html/user.html"));
      res.render("member", {
        pageTitle: "Member Page",
        Authenticated: true,
        dbEvents: dbEvents.map((event) => event.toJSON()),
      });
      // res.json(dbEvents)
    });
  });
};
