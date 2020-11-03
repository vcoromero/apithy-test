const express = require("express");
const UserController = require("../controllers/user");

const api = express.Router();

//api.get("/user", UserController.home);
api.get("/users/:page?", UserController.getUsers);
api.get("/user/:id", UserController.getUser);


module.exports = api;
