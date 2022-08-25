const { DataTypes } = require('sequelize')


module.exports = (sequelize) => {

    sequelize.define('Alumno', {
        idAlumno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        apellidoAlumno: {
            type: DataTypes.STRING,
        },
        nombreAlumno: {
            type: DataTypes.STRING,
        },
        dniAlumno: {
            type: DataTypes.STRING,
        },

    }, { timestamps: false })
}
