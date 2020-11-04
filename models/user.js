const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, type) =>{
    const user = sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING(50),
        email: type.STRING(50)
    }, {
  timestamps: false
})
sequelizePaginate.paginate(user);
return user;
}
