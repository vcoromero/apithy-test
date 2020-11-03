const express = require("express");
const RoleController = require("../controllers/role");

const api = express.Router();
api.get("/role", RoleController.home);


module.exports = api;
