const { Sequelize } = require('sequelize');

const RoleModel = require('./models/role');
const UserModel = require('./models/user')

// conexion db
const sequelize = new Sequelize('apithy', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Role = RoleModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
User.belongsTo(Role);


sequelize.sync( {force: false}). then(
  ()=>{
    console.log('tablas syncs')
  }
)
/*try {
  sequelize.authenticate();
  console.log('La conexion a la bd ha sido exitosa');
  
} catch (error) {
  console.error('No se pudo conectar a la bd:', error);
}*/

module.exports = {
  Role,
  User
}