"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Size extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Car
            Size.hasMany(models.Car, { foreignKey: "size_id" });
        }
    }
    Size.init(
        {
            name: DataTypes.STRING,
            capacity: DataTypes.INTEGER,
            createdBy: DataTypes.INTEGER,
            deletedBy: DataTypes.INTEGER,
            lastUpdatedBy: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Size",
            paranoid: true,
        }
    );
    return Size;
};
