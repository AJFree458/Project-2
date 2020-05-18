/* eslint-disable prettier/prettier */
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  bcrypt = require("bcryptjs"),
  db = require("../models");
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (s, r, o) {
      console.log(s),
        db.User.findOne({
          where: {
            email: s,
          },
        })
          .then(function (s) {
            console.log("Password: " + s.password);
            var e = bcrypt.compareSync(r, s.password);
            return (
              console.log("IsValid: " + e),
              s && e
                ? (console.log("Authenticated!!"), o(null, s))
                : (console.log("email or password is invalid"),
                  o(null, !1, {
                    errors: {
                      "email or password": "is invalid",
                    },
                  }))
            );
          })
          .catch(o);
    }
  )
),
  passport.serializeUser(function (s, e) {
    e(null, s);
  }),
  passport.deserializeUser(function (s, e) {
    e(null, s);
  }),
  (module.exports = passport);
