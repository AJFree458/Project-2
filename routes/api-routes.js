/* eslint-disable prettier/prettier */
// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var saltRounds = 10;
var bcrypt = require("bcrypt");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
    // .then(function () {
    //   res.redirect(302, "/");
    // })
    // .catch(function (err) {
    //   res.status(401).json(err);
    // });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log("email: " + req.body.email);
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.psw,
    })
      .then(function () {
        res.redirect(302, "/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/event/:id", function (req, res) {
    if (req.user) {
      db.Events.findOne({
        where: {
          id: req.params.id,
        },
      })
        .then(function (Event) {
          res.json(Event);
        })
        .catch(function (err) {
          res.status(401).json(err);
        });
    }
  });
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });

  // /register: storing name, email and password and redirecting to home page after signup
  app.post("/user/create", function (req, res) {
    bcrypt.hash(req.body.signup, saltRounds, function (err, hash) {
      db.User.create({
        name: req.body.signup,
        email: req.body.email,
        password: hash,
      }).then(function (data) {
        if (data) {
          res.redirect("/login");
        }
      });
    });
  });

  //login page: storing and comparing email and password,and redirecting to home page after login
  app.post("/user", function (req, res) {
    db.User.findOne({
      where: {
        email: req.body.email,
      },
    }).then(function (user) {
      if (!user) {
        res.redirect("/");
      } else {
        bcrypt.compare(req.body.password, user.password, function (
          err,
          result
        ) {
          if (result == true) {
            res.redirect("/index");
          } else {
            res.send("Incorrect password");
            res.redirect("/");
          }
        });
      }
    });
  });
};
