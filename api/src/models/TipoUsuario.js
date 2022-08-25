const {DataTypes} = require ('sequelize')

module.exports = (sequelize) =>
 sequelize.define('TipoUsuario',{
    idTipoUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipoUsuario:{
        type: DataTypes.STRING,
    },    
},{timestamps: false})


