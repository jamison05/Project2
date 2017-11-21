const mongoose = require("mongoose");


// Use native JavaScript promises in Mongoose commands
mongoose.Promise = Promise;

// Connect Mongoose to our app's local database
mongoose.connect("mongodb://localhost/project2_db", { useMongoClient: true })
  .then(() => {
      console.log("Mongoose is connected!");
  })
  .catch((err) => {
      console.log("Mongoose connection FAILED! 🚨");
      console.log(err);
  });
