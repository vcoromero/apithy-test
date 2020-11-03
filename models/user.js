const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, type) =>{
    const user = sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING(50),
        email: type.STRING(50),
        fk_role_id: type.INTEGER
    }, {
  timestamps: false
})
sequelizePaginate.paginate(user);
return user;
}
