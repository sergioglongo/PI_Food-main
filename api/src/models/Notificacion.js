const {DataTypes} = require ('sequelize')

module.exports = (sequelize) => sequelize.define('Notificacion',{
    idNotificacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    asunto:{
        type: DataTypes.TEXT,
    },
    cuerpo:{
        type: DataTypes.TEXT,
    },
    fechaNotificacion:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    },
    activa:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
},{timestamps: false})

