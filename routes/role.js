const express = require("express");
const RoleController = require("../controllers/role");

const api = express.Router();

//api.get("/role", RoleController.home);
api.get("/roles", RoleController.getRoles);



module.exports = api;
