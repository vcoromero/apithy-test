const express = require("express");
const UserController = require("../controllers/user");
const multipart = require("connect-multiparty");
const md_upload = multipart({ uploadDir: "./uploads" });

const api = express.Router();

//api.get("/user", UserController.home);
api.get("/users/:page?", UserController.getUsers);
api.get("/user/:id", UserController.getUser);
api.post("/users-import",
    [md_upload], UserController.importFromExcel);



module.exports = api;
