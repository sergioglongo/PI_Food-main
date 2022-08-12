const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healtScore:{
      type: DataTypes.FLOAT,
      default: 0
    },
    steps:{
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: []
    },
    image:{
      type: DataTypes.STRING,
      default: "https://www.lutherplace.org/wp-content/uploads//2013/12/HE_empty-plate-thinkstock_s4x3_lg.jpg"
    } ,

  },// fin de declaraciones
  { //opciones adicionales
    timestamps: false 
  }); //fin de define
};
