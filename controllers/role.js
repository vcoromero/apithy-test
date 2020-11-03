//const Role = require("../models/role");

//metodos de prueba
function home(request, response) {
  response
    .status(200)
    .send({ message: "Api de role" });
}

module.exports = {
  home
};
