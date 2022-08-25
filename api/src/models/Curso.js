const {DataTypes} = require ('sequelize')

module.exports = (sequelize) => sequelize.define('Curso',{
    idCurso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreCurso:{
        type: DataTypes.STRING,
    },    
},{timestamps: false})


