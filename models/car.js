"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Car extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // CreatedBy
            Car.belongsTo(models.User, { foreignKey: "createdBy" });

            // DeletedBy
            Car.belongsTo(models.User, { foreignKey: "deletedBy" });

            // LastUpdatedBy
            Car.belongsTo(models.User, { foreignKey: "lastUpdatedBy" });

            // Manufacture
            Car.belongsTo(models.Manufacture, { foreignKey: "manufacture_id" });

            // Type
            Car.belongsTo(models.Type, { foreignKey: "type_id" });

            // Size
            Car.belongsTo(models.Size, { foreignKey: "size_id" });

            // Transmission
            Car.belongsTo(models.Transmission, { foreignKey: "transmission_id" });
        }
    }
    Car.init(
        {
            name: DataTypes.STRING,
            plate: DataTypes.STRING,
            model: DataTypes.STRING,
            image: DataTypes.TEXT,
            description: DataTypes.TEXT,
            rentPerDay: DataTypes.INTEGER,
            year: DataTypes.INTEGER,
            available: DataTypes.BOOLEAN,
            manufacture_id: DataTypes.INTEGER,
            type_id: DataTypes.INTEGER,
            size_id: DataTypes.INTEGER,
            transmission_id: DataTypes.INTEGER,
            createdBy: DataTypes.INTEGER,
            deletedBy: DataTypes.INTEGER,
            lastUpdatedBy: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Car",
            paranoid: true,
        }
    );
    return Car;
};
