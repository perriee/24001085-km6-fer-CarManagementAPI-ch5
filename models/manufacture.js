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
            // USER - CreatedBy
            Manufacture.belongsTo(models.User, { foreignKey: "createdBy" });

            // USER - DeletedBy
            Manufacture.belongsTo(models.User, { foreignKey: "deletedBy" });

            // USER - LastUpdatedBy
            Manufacture.belongsTo(models.User, { foreignKey: "lastUpdatedBy" });

            // Car
            Manufacture.hasMany(models.Car, { foreignKey: "manufacture_id" });
        }
    }
    Manufacture.init(
        {
            name: DataTypes.STRING,
            createdBy: DataTypes.INTEGER,
            deletedBy: DataTypes.INTEGER,
            lastUpdatedBy: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Manufacture",
            paranoid: true,
        }
    );
    return Manufacture;
};
