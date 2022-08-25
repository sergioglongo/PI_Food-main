const {DataTypes} = require ('sequelize')

module.exports = (sequelize) => sequelize.define('Pago',{
    idPago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    montoPago:{
        type: DataTypes.FLOAT,
    },
    estadoPago:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    fechaPago:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    }
},{timestamps: false})

