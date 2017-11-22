const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Setups the structure of the username.

const userSchema = new Schema(

{
      firstName : {
        type:String,
        required:[true, "Let us know your name"]
      },
      lastName : {
        type:String,
        required:[true, "Let us know your name"]
      },
      email:{
        type:String,
        match:[/.+@.+/, "Please place an @ sign in your email"]
      },
      encryptedPassword:{type:String},
      role:{
        type:String,
        enum:["normal", "admin"],
        default:"normal"
      },
      musician: {type: String,
        enum:[true, false],
        dafault:"true"},

      musical_genre: {type: String,
        enum:[`classical`,`rock`,`pop`,`jazz`,
        `hip-hop`,`reggaeton`,`soca`,`hard-rock`, `blues`,
        `sound-track`, `rhythm&blues`
        ],
        dafault:"classical"}
},
{
timestamp:true
}

);


const UserModel = mongoose.model("User", userSchema);


module.exports = UserModel;
