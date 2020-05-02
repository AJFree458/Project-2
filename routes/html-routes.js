/* eslint-disable prettier/prettier */
var express = require("express");

var router = express.Router();

router.get("/", function (req, res) {
  res.render("index");
});

// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", function (req, res) {
    // If the user already has an account send them to the index page
    if (req.user) {

      res.redirect("../public/html/volunteer.html");
    }
    res.sendFile(path.join(__dirname, "../public/html/signup.html"));
  });

  app.get("/privacy", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/privacy.html"));
  });

  app.get("/volunteer", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/volunteer.html"));
  });

  app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/signup.html"));

  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the index page
    if (req.user) {

      res.redirect("../public/html/volunteer.html");
    }
    res.sendFile(path.join(__dirname, "../public/html/login.html"));

  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the login page
  app.get("../public/html/login.html", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });
};
