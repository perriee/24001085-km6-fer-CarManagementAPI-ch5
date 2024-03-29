"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Cars", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            plate: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            model: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            image: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            rentPerDay: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            year: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            available: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            manufacture_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: {
                        tableName: "Manufactures",
                    },
                    key: "id",
                },
            },
            type_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: {
                        tableName: "Types",
                    },
                    key: "id",
                },
            },
            size_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: {
                        tableName: "Sizes",
                    },
                    key: "id",
                },
            },
            transmission_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: {
                        tableName: "Transmissions",
                    },
                    key: "id",
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Cars");
    },
};
