const express = require("express");
const UserController = require("../controllers/user");

var api = express.Router();
api.get("/home", UserController.home);
module.exports = api;
