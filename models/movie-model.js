const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Setups the structure of the username.

const movieSchema = new Schema(

{       compTitle : {
        type:String,
        required:[true, "Let us know your name"]
      },

      compScene:{type: String},
      //This is just a description of the scene non-specific
      compSceneActors:{type:String},
      sceneLength:{type:Number}

}, {timestamp:true});




const movieModel = mongoose.model("Song", movieSchema);


module.exports = movieModel;
