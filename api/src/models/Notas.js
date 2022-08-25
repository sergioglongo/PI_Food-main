const {DataTypes} = require ('sequelize')

module.exports = (sequelize) => sequelize.define('Notas',{
    idAsistencia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estado:{
        type: DataTypes.ENUM,
    values: ['Presente', 'Ausente', 'Justificada']
    },    
    fecha:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    }
},{timestamps: false})


