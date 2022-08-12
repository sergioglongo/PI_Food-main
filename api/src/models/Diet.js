const {DataTypes} = require ('sequelize')
//const { default: ModelManager } = require('sequelize/types/model-manager')

module.exports= (sequelize) => {
    sequelize.define('diet',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
       
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

    } //fin de atributos
    ,{ timestamps: false }
    )//fin de sequelize()
}
