/* eslint-disable prettier/prettier */
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcryptjs");

var db = require("../models");
// var User = require('../models').user;

var compression = require("compression");
var express = require("express");

var app = express();

// compress all responses
app.use(compression());

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    function (email, password, done) {
      // When a user tries to sign in this code runs
      console.log(email);
      db.User.findOne({
        where: {
          email: email,
        },
      })
        .then(function (user) {
          console.log("Password: " + user.password);
          var isValid = bcrypt.compareSync(password, user.password);
          console.log("IsValid: " + isValid);

          if (!user || !isValid) {
            console.log("email or password is invalid");
            return done(null, false, {
              errors: {
                "email or password": "is invalid",
              },
            });
          }
          console.log("Authenticated!!");
          return done(null, user);
        })
        .catch(done);
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
