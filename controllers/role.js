const { Role } = require('../db');
//metodos de prueba
function home(request, response) {
  response
    .status(200)
    .send({ message: "Api de role" });
}

async function getRoles(req, res){
  const roles = await Role.findAll()
  res.status(200).send(roles)
}

module.exports = {
  home,
  getRoles
};
