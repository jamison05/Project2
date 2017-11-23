const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const UserModel = require("../models/users-model");

const songModel = require("../models/z_songs-model");
require('../config/mongoose-setup');
const router = express.Router();


//Load the sounds on to the collections view page.

// router.get("/collections", (req, res, next) => {
//     // redirect to home if you are already logged in
//     if (req.user) {
//           res.render("/collections-view/collections");
//         //The return stops the page from rendering the loginView
//         return;
//       }else{
//
//         res.redirect("/");
//
//       }
//
// });


router.get("/collections", (req, res, next) => {//Gets the html page
    songModel
      .find()
      .limit(25)
      .sort({ dateAdded: -1 })
      .exec()
      .then((songResults) => {
          // create a local variable for the view to access the DB results
          res.locals.listOfSongs = songResults;

          //List all of the the songs displayed collections ejs
          res.render("collections-views/collections");
      })
      .catch((err) => {
          // render the error page with our error
          next(err);
      });
}); //

// STEP #1: show the new product form
router.get("/collections/new", (req, res, next) => {
    res.render("collections-view/specificSongDisplay-view");
}); // GET /products/new

// //Display this page on rendering the home_page.
// router.get("/load_movies", (req, res, next) => {
//     // redirect to home if you are already logged in
//     if (req.user) {
//         res.redirect("/");
//         //The return stops the page from rendering the loginView
//         return;
//       }
//         res.render("login_userpage/s");
// });

router.get("/collections/:id/specificSongDisplay-view", (req, res, next)=> {

  songModel.findById(req.params.id)
    .then((songFromDb) => {
        // update the document
    res.locals.songDetails= songFromDb;    //                       |
    res.render("collections-view/specificSongDisplay-view");
    })
    .catch((err) =>{
      next(err);
    });

});

router.post("/collections/:id", (req, res, next) => {
    // retrieve the document from the database
    songModel.findById(req.params.id)
      .then((songFromDb) => {
          // update the document
          songFromDb.set({
              songTitle: res.body.songNamedisplay,
              songsnippetYear: req.body.songYear,
              soundtrack_Number:req.body.songTrack,
              songPlayUrl: req.body.songPlayurl,
              songImageUrl: req.body.songImageUrl,
              songVideoUrl: req.body.songVideoUrl,
          });
              // fields from         names of the
              // model's schema      input tags

          // and then save the updates
          // (return the promise of the next database operation)
          res.locals.songDetails = songFromDb;
          return songFromDb.save();
      })
      .then(() => {
          // STEP #3: redirect after a SUCCESSFUL save
          // redirect to the product details page
          res.redirect(`/collections/`);
            // you CAN'T redirect to an EJS file
            // you can ONLY redirect to a URL
      })
      .catch((err) => {

        if (err.errors){
            res.locals.validationErrors = err.errors;
            res.render(`collections/${req.params.id}`);

        }
          // render the error page with our error
          next(err);
      });
});

module.exports = router;
