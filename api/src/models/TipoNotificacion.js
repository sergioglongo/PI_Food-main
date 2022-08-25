const {DataTypes} = require ('sequelize')

module.exports = (sequelize) =>
 sequelize.define('TipoNotificacion',{
    idNotificacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipoNotificacion:{
        type: DataTypes.STRING,
    },    
},{timestamps: false})


