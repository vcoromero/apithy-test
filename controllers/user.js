const { User } = require('../db');
const { Role } = require('../db');
const XLSX = require('xlsx');

//metodos de prueba
function home(request, response) {
  response
    .status(200)
    .send({ message: "Api de user" });
}


async function getUsers(req, res) {
  const page = req.params.page ? req.params.page : 1
  const options = {
    include: Role,
    page: req.params.page ? req.params.page : 1,
    paginate: 50,
  }
  const { docs, pages, total } = await User.paginate(options)
  res.status(200).send({ users: docs, actual_page: Number(page), total_pages: pages, total_users: total })
}


async function getUser(req, res) {
  const user_id = req.params.id;

  const users = await User.findAll({
    include: Role,
    where: {
      id: user_id
    }
  })
  res.status(200).send(users)
}

async function importFromExcel(req, res) {

  const exist_roles = []
  const roles = await Role.findAll()
  for (role of roles) {
    exist_roles.push(role.name)
  }


  if (req.files) {
    const file_path = req.files.excel.path;
    const workbook = XLSX.readFile(file_path);
    const sheet = workbook.SheetNames[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    const validador = {}
    for (const item of dataExcel) {
      if (exist_roles.includes(item.code)) {
        //pasa
      } else {
        // no pasa
        validador.role =
        {
          value: item.code,
          validatios: ''
        }

      }
      //nombre mas de 50
      if (item.name.length > 50) {
        //no pasa
      } else {
        validador.name =
        {
          value: item.name,
          validatios: ''
        }
      }
      const exist_email = await User.findAll({
        where: {
          email:
            item.email
        }
      })
      if (Object.keys(exist_email).length) {
        //console.log(exist_email[0].email)
      } else {
        validador.email =
        {
          value: item.email,
          validatios: ''
        }
      }

    }
  }
  console.log(validador)
  
}


module.exports = {
  home,
  getUsers,
  getUser,
  importFromExcel
};
