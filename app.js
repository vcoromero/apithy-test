const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//cargar rutas
const user_routes = require("./routes/user");
const role_routes = require("./routes/role");


//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //las peticiones las convierte a json, ocurre en cualquier peticion de backend

//cors
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  response.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});

//rutas
app.use("/api", user_routes);
app.use("/api", role_routes);

//exportar
module.exports = app;