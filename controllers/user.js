//const User = require("../models/user");

//metodos de prueba
function home(request, response) {
  response
    .status(200)
    .send({ message: "Hola mundo desde el servidor de nodejs" });
}

module.exports = {
  home
};
