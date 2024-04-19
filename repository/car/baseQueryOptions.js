// Models
const { User, Manufacture, Type, Size, Transmission } = require("../../models");

exports.baseQueryOptions = {
    attributes: {
        exclude: ["manufacture_id", "type_id", "size_id", "transmission_id"],
    },
    include: [
        {
            model: User,
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "createdBy",
                    "deletedBy",
                    "lastUpdatedBy",
                ],
            },
        },
        {
            model: Manufacture,
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "createdBy",
                    "deletedBy",
                    "lastUpdatedBy",
                ],
            },
        },
        {
            model: Type,
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "createdBy",
                    "deletedBy",
                    "lastUpdatedBy",
                ],
            },
        },
        {
            model: Size,
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "createdBy",
                    "deletedBy",
                    "lastUpdatedBy",
                ],
            },
        },
        {
            model: Transmission,
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "createdBy",
                    "deletedBy",
                    "lastUpdatedBy",
                ],
            },
        },
    ],
};
