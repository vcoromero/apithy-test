//const User = require("../models/user");

//metodos de prueba
function home(request, response) {
  response
    .status(200)
    .send({ message: "Api de user" });
}

module.exports = {
  home
};
