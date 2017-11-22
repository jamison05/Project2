const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
//const UserModel = require("../models/users-model");
const songModel = require("../models/z-songs-model");
const movieModel = require("../models/movie-model");
require('../config/mongoose-setup');
const router = express.Router();
