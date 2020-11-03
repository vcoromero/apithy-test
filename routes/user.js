const express = require("express");
const UserController = require("../controllers/user");

const api = express.Router();
api.get("/user", UserController.home);
module.exports = api;
