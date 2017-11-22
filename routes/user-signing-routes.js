const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const UserModel = require("../models/users-model");

require('../config/mongoose-setup');
const router = express.Router();




// Showing the sign in page.



router.get("/signUp", (req, res, next) => {
    // redirect to home if you are already logged in
    if (req.user) {
        res.redirect("/");
        //The return stops the page from rendering the loginView
        return;
      }
        res.render("login_userpage/signUp");
});

// Fans are inputted into the database
router.post("/process-signup", (req, res, next) => {
    // check if password is invalid
    if (req.body.signupPassword.length < 8 ||
        req.body.signupPassword.match(/[^a-z0-9]/i) === null
    ) {                          //          |
                                 // if no special characters
            // display the form again if it is
            res.locals.errorMessage = "Password is invalid.";
            res.render("login_userpage/signUp");

        // early return to stop the function since there's an error
        // (prevents the rest of the code from running)
        return;
    }

        // query the database to see if the email is taken
    UserModel.findOne({ email: req.body.signupEmail })
      .then((userFromDb) => {
        // "userFromDb" will be null if the email IS NOT taken

        // display the form again if the email is taken
          if (userFromDb !== null) {
              res.locals.errorMessage = "Email is taken.";
              res.render("login_userpage/signUp");
              return;
          }

        // generate a new salt for this user's password
        //Or in other words initiate a random Seed to create a hash code
          const salt = bcrypt.genSaltSync(3);
          const scrambledPassword =  //    |
          bcrypt.hashSync(req.body.signupPassword, salt);

          const theUser = new UserModel({
              firstName: req.body.signupFirstname,
              lastName: req.body.signupLastname,
              email:    req.body.signupEmail,
              encryptedPassword: scrambledPassword,
              musician: req.body.musicianQuest,
              musical_genre: req.body.musicGenreQuest,
          });

          // return the promise of the next database query
          // Or in otherwords saves the Users into the database.
          return theUser.save();
      })
      .then(() => {
          // redirect to the home page on a successful sign up
          res.redirect("/");
      })
      .catch((err) => {
          next(err);
      });
}); // POST /process-signup


//Processing the login form with users in the database.
router.post("/process-login", (req, res, next) => {
    // find a user document in the database with that email
    console.log("prcocessing------------------------- login");
    UserModel.findOne({ email: req.body.loginEmail })
      .then((userFromDb) => {
          // if we didn't find a user

          console.log("in the password promises");
          console.log(userFromDb);

          if (userFromDb === null) {
              // display the form again because the email is wrong
              res.locals.errorMessage = "Email incorrect.";
              res.render("login_userpage/loginView");

              // early return to stop the function since there's an error
              // (prevents the rest of the code from running)
              return;
          }

          // if email is correct now we check the password
          const isPasswordGood =
            bcrypt.compareSync(req.body.loginPassword, userFromDb.encryptedPassword);

          if (isPasswordGood === false) {
              res.locals.errorMessage = "Password incorrect.";
              res.render("login_userpage/loginView");
              return;
          }

          // CREDENTIALS ARE GOOD! We need log the user in.

          // Passport defines the "req.login()" method
          // for us to specify when to log in a user into the session
          req.login(userFromDb, (err) => {
              // check to see if the log in worked
              if (err) {
                  next(err);
              }
              else {
                  // if it worked redirect to the home page
                  res.redirect("/");
              }
          });  //req.login();
      }) // then()
      .catch((err) => {
          next(err);
      });
});




module.exports = router;
