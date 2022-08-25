const {DataTypes} = require ('sequelize')

module.exports = (sequelize) => 
sequelize.define('Asistencia',{
    idAsistencia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estado:{
        type: DataTypes.ENUM,
    values: ['Presente', 'Ausente', 'Justificada']
    },    
    fechaAsistencia:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    }
},{timestamps: false})


