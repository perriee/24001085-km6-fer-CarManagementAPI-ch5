"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Manufacture, { foreignKey: "createdBy" });
        }
    }
    User.init(
        {
            email: {
                type: DataTypes.STRING,
                unique: true, // Add the unique constraint
                validate: {
                    isEmail: true, // Validate email format
                },
            },
            password: DataTypes.STRING,
            name: DataTypes.STRING,
            photo: DataTypes.STRING,
            role: DataTypes.ENUM("user", "admin", "superadmin"),
        },
        {
            sequelize,
            modelName: "User",
            paranoid: true, // enable soft delete
        }
    );
    return User;
};
