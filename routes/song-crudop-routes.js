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
//           res.render("/collections-views/collections");
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
          console.log(res.locals.listOfSongs);
          //List all of the the songs displayed collections ejs
          //You must seed the files first before rendereing it.

          res.render("collections-views/collections");
      })
      .catch((err) => {
          // render the error page with our error
          next(err);
      });
}); //

// STEP #1: show the new product form
router.get("/collections/new", (req, res, next) => {
    res.render("collections-views/specificSongDisplay-view");
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

router.get("/collections/:songid/song_details", (req, res, next) => {

  console.log("Song details");
    //      /products/details?prodId=9999
    //                           |
    //              req.query.prodId
    // ProductModel.findOne({ _id: req.query.prodId })
    console.log("The route callback has been initialized");
  songModel.findById(req.query.songid)
    .then((songFromDb) => {
        // update the document
    res.locals.songDetails= songFromDb;
    console.log("Aboutt to render");
   //                       |
    res.render("collections-views/song_details");
    console.log("Did not render");

    })
    .catch((err) =>{
      next(err);
    });
}); // GET /products/details

router.get("/collections/:songid", (req, res, next)=> {
    console.log("The route callback has been initialized");
  songModel.findById(req.params.songid)
    .then((songFromDb) => {
        // update the document
    res.locals.songDetails= songFromDb;
    console.log("Aboutt to render");
   //                       |
    res.render("collections-views/specificSongDisplay-view");
    console.log("Did not render");

    })
    .catch((err) =>{
      next(err);
    });

});

// STEP #1: show edit form
router.get("/collections/:songid/edit", (req, res, next) => {
    // retrieve the document from the database
    songModel.findById(req.params.songid)
      .then((songFromDb) => {
          // create a local variable for the view to access the DB result
          // (this is so we can pre-fill the form)
          res.locals.songDetails = songFromDb;

          res.render("collections-views/specificSongDisplay-view");
      })
      .catch((err) => {
          // render the error page with our errors
          next(err);
      });
});

router.post("/collections/:songid", (req, res, next) => {
    // retrieve the document from the database
    songModel.findById(req.params.id)
      .then((songFromDb) => {
          // update the document
          songFromDb.set({
              songTitle: res.body.songNamedisplay,
              songsnippetYear: req.body.songYear,
              soundTrackNumber:req.body.songTrackNumber,
              songPlayUrl: req.body.songPlayUrl,
              songImageUrl: req.body.songImageUrl,
              songVideoUrl: req.body.songVideoUrl,
          });
              // fields from         names of the
              // model's schema      input tagssongTrackNumber

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
