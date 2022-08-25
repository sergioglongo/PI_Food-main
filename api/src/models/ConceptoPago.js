const {DataTypes} = require ('sequelize')


module.exports = (sequelize) => sequelize.define('ConceptoPago',{
    idConceptoPago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    conceptoPago:{
        type: DataTypes.STRING,
    },    
    tipo:{
        type: DataTypes.ENUM,
    values: ['General', 'Notificacion']
    }
},{timestamps: false})


