//Seed the music and image_data
require("../config/mongoose-setup");


// import the product model to do product queries
//const songModel = require("../models/z_songs-model");
//const movieModel = require("../models/movie-model");


//const zimmer_compinfo =[];

const SongModel = require("../models/z_songs-model");


const SongInfo = [
{
    songTitle: "Inception:Time_snp1",
    songsnippetYear: 2010,
    songPlayUrl: "../public/sounds/time_snd1.mpg",
    songImageUrl: "../public/images/time_img1.jpg",
    songVideoUrl: "none",
    dateAdded: new Date()
  },

  {
      songTitle: "Inception:Time_snp2",
      songsnippetYear: 2010,
      songPlayUrl: "../public/sounds/time_snd2.mpg",
      songImageUrl: "../public/images/time_img2.jpg",
      songVideoUrl: "none",
      dateAdded: new Date()
    },
    {
        songTitle: "Inception:Time_snp3",
        songsnippetYear: 2010,
        songPlayUrl: "../public/sounds/time_snd3.mpg",
        songImageUrl: "../public/images/time_img3.jpg",
        songVideoUrl: "none",
        dateAdded: new Date()
      },


];



SongModel.create(SongInfo)
  .then((Song_col_send) => {
      console.log(`Inserted ${Song_col_send.length} songs.`);
  })
  .catch((err) => {
      console.log("Song insert error!");
      console.log(err);
  });
