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
            // Manufacture
            Car.belongsTo(models.Manufacture, { foreignKey: "manufacture_id" });

            // Type
            Car.belongsTo(models.Type, { foreignKey: "type_id" });

            // Size
            Car.belongsTo(models.Size, { foreignKey: "size_id" });
        }
    }
    Car.init(
        {
            name: DataTypes.STRING,
            plate: DataTypes.STRING,
            model: DataTypes.STRING,
            image: DataTypes.TEXT,
            rentPerDay: DataTypes.INTEGER,
            year: DataTypes.INTEGER,
            available: DataTypes.BOOLEAN,
            manufacture_id: DataTypes.BIGINT,
            type_id: DataTypes.BIGINT,
            size_id: DataTypes.BIGINT,
        },
        {
            sequelize,
            modelName: "Car",
        }
    );
    return Car;
};
