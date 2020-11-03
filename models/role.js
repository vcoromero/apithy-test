module.exports = (sequelize, type) =>{
    const role = sequelize.define('role', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING(50),
        code: type.STRING(50)
    }, {
  timestamps: false
})
return role;
}
