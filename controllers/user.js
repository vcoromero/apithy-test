const { User } = require('../db');
const { Role } = require('../db');
const XLSX = require('xlsx');

//metodos de prueba
function home(request, response) {
  return response
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
  return res.status(200).send({ users: docs, actual_page: Number(page), total_pages: pages, total_users: total })
}


async function getUser(req, res) {
  const user_id = req.params.id;

  const users = await User.findAll({
    include: Role,
    where: {
      id: user_id
    }
  })
  return res.status(200).send(users)
}


function insertUser(data) {
  //sub divido el array para hacerlos mas pequenos e insertar por lotes
  let sub_array = []
  let new_array = []
  for (let i = 0; i < data.data_to_insert.length; i += 1000) {
    sub_array = data.data_to_insert.slice(i, i + 1000)
    new_array.push(sub_array)
  }
  new_array.forEach(element => {
    //inserto por lotes
    User.bulkCreate(element).then(() => {
      return true
    }).catch(() => {
      return false
    })
  });
}
async function validateData(data) {
  //variables para mostrar en el response
  let aux_validador = {}
  const validador = []
  let aux_success = {}
  const success = []
  let aux_data_to_insert = {}
  let data_to_insert = []

  //obteniendo todos los roles
  const exist_roles = []
  const roles = await Role.findAll()
  for (role of roles) {
    exist_roles.push({ id: role.id, code: role.code })
  }

  for (const item of data) {

    //validando los datos
    aux_validador = {}
    aux_success = {}
    aux_data_to_insert = {}

    //nombre mas de 50
    if (item.name.length > 50) {
      //no pasa
      aux_validador.role =
      {
        value: item.name,
        validation: 'El nombre es mayor a 5 caracteres'
      }
    } else {
      //si pasa
      aux_data_to_insert.name = item.name
      aux_success.name = item.name
      aux_validador.name =
      {
        value: item.name,
        validation: ''
      }
    }
    //email
    const exist_email = await User.findAll({
      where: {
        email:
          item.email
      }
    })
    if (Object.keys(exist_email).length) {
      aux_validador.role =
      {
        value: item.email,
        validation: 'El email ya existe en la base de datos'
      }
    } else {
      aux_data_to_insert.email = item.email
      aux_success.email = item.email
      aux_validador.email =
      {
        value: item.email,
        validation: ''
      }
    }
    //role
    const find_role = exist_roles.find(role => role.code === item.code)
    if (find_role) {
      //pasa
      aux_data_to_insert.roleId = find_role.id
      aux_success.code = item.code
      aux_validador.role =
      {
        value: item.code,
        validation: ''
      }
    } else {
      // no pasa
      aux_validador.role =
      {
        value: item.code,
        validation: 'No existe el rol'
      }

    }


    success.push(aux_success)
    validador.push(aux_validador)
    data_to_insert.push(aux_data_to_insert)

  }
  return { success, validador, data_to_insert }

}
async function importFromExcel(req, res) {
  //leyendo el archivo excel
  const file_path = req.files.excel.path;
  const workbook = XLSX.readFile(file_path);
  const sheet = workbook.SheetNames[0];
  const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

  //metodo para validar datos del excel
  const validatedData = await validateData(dataExcel)
  //aqui hago la insercion de los datos a la bd
  const insert = insertUser(validatedData)
  if (insert) {
    return res.status(200).send({
      error: '',
      code: 200,
      hint: 'success',
      message: 'success',
      data: [
        {
          success: validatedData.success,
          validation: validatedData.validador
        }
      ]
    })
  }

}


module.exports = {
  home,
  getUsers,
  getUser,
  importFromExcel
};
