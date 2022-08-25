const {DataTypes} = require ('sequelize')

module.exports = (sequelize) => sequelize.define('Materia',{
    idMateria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    materia:{
        type: DataTypes.STRING,
    },    
},{timestamps: false})


