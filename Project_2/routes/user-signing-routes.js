const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const UserModel = require("../models/users-model");


const router = express.Router();




// Showing the sign in page.
router.get("/login", (req, res, next) => {
    // redirect to home if you are already logged in
    if (req.user) {
        res.redirect("/");
        //The return stops the page from rendering the loginView
        return;
      }
    res.render("login_userpage/loginView");
});


router.get("/signUp", (req, res, next) => {
    // redirect to home if you are already logged in
    if (req.user) {
        res.redirect("/");
        //The return stops the page from rendering the loginView
        return;
      }
    res.render("login_userpage/signUp");
});
module.exports = router;
