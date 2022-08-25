const {DataTypes} = require ('sequelize')

module.exports = (sequelize) =>
 sequelize.define('Usuario',{
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreUsuario:{
        type: DataTypes.STRING,
    },
    mailUsuario:{
        type: DataTypes.STRING,
    },

},{timestamps: false})

