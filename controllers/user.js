const { User } = require('../db');

//metodos de prueba
function home(request, response) {
  response
    .status(200)
    .send({ message: "Api de user" });
}


async function getUsers(req, res){
  const page = req.params.page ? req.params.page : 1
  const options = {
  page: req.params.page ? req.params.page : 1,
  paginate: 50,
 }
 const { docs, pages, total } = await User.paginate(options)
  res.status(200).send({users: docs, page, pages, total})
}


async function getUser(req, res){
  const user_id = req.params.id;
  
  const users = await User.findAndCountAll({
    where:{
      id: user_id
    }
  })
  res.status(200).send(users)
}
module.exports = {
  home,
  getUsers,
  getUser
};
