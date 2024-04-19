"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Manufacture extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Car
            Manufacture.hasMany(models.Car, { foreignKey: "manufacture_id" });
        }
    }
    Manufacture.init(
        {
            name: DataTypes.STRING,
            createdBy: DataTypes.STRING,
            deletedBy: DataTypes.STRING,
            lastUpdatedBy: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Manufacture",
            paranoid: true,
        }
    );
    return Manufacture;
};
