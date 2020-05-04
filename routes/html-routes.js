/* eslint-disable prettier/prettier */
var db = require("../models");
// var express = require("express");
// var router = express.Router();
var path = require("path"); // Requiring path to so we can use relative routes to our HTML files

// router.get("/", function (req, res) {
//   res.render("index");
// });

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
    // res.sendFile(path.join(__dirname, "../public/html/privacy.html"));
    res.render("privacy", { layout: false });
  });

  app.get("/signup", (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/html/signup.html"));
    res.render("signup", { layout: "signupMain" });
  });

  app.get("/login", function (req, res) {
    // res.sendFile(path.join(__dirname, "../public/html/login.html"));
    res.render("login", { layout: "loginMain" });
  });

  // Routes that require Authentification to view
  // If a user who is not logged in tries to access one of these routes they will be redirected to the login page

  app.get("/volunteer", isAuthenticated, (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/html/volunteer.html"));
    res.render("volunteer", {
      memberName: req.user.name,
      Authenticated: true,

    });
  });

  // If a user who is not logged in tries to access this route they will be redirected to the login page
  app.get("/NewEvent", isAuthenticated, (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/html/newEvent.html"));
    res.render("newEvent");
  });
};
