/* eslint-disable prettier/prettier */
var db = require("../models");
// var express = require("express");
// var router = express.Router();
var path = require("path"); // Requiring path to so we can use relative routes to our HTML files

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", function (req, res) {
    // res.sendFile(path.join(__dirname, "../public/html/index.html"));
    res.render("index");
  });

  app.get("/js", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/js/"));
  });

  app.get("/privacy", (req, res) => {
    res.render("privacy", { layout: false });
  });

  app.get("/volunteer", (req, res) => {
    db.Events.findAll({}).then(function (dbEvents) {
      console.log(dbEvents[0]);
      // res.sendFile(path.join(__dirname,"../public/html/user.html"));
      res.render(
        "volunteer",
        { layout: "volunteerMain" },
        {
          volunteers: dbEvents.map((event) => event.toJSON()),
        }
      );
      // res.json(dbEvents)
    });
  });

  app.get("/signup", (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/html/signup.html"));
    res.render("signup", { layout: "signupMain" });
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the index page
    // if (req.user) {
    // res.redirect("/login");
    // }
    res.render("login", { layout: "loginMain" });
  });

  // If a user who is not logged in tries to access this route they will be redirected to the login page
  app.get("/NewEvent", isAuthenticated, (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/html/newEvent.html"));
    res.render("newEvent");
  });

  app.get("/members", isAuthenticated, function (req, res) {
    db.Events.findAll({}).then(function (dbEvents) {
      console.log(dbEvents[0]);
      // res.sendFile(path.join(__dirname,"../public/html/user.html"));
      res.render("members", {
        dbEvents: dbEvents.map((event) => event.toJSON()),
      });
      // res.json(dbEvents)
    });
  });
};
