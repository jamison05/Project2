const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Setups the structure of the username.

const songSchema = new Schema(

{       songTitle : {
        type:String,
        required:[true, "Let us know your name"]
      },
        songsnippetYear: {
        type:Number,
        required:[true, "Let us know your name"]
      },

      soundtrack_Number:{type:Number},
      songLength:{type:Number},//Display the song length in seconds
      songPlayUrl:{type: String},
      songImageUrl:{type:String},
      songVideoUrl:{type:String}
}, {timestamp:true});




const songModel = mongoose.model("Song", songSchema);


module.exports = songModel;
