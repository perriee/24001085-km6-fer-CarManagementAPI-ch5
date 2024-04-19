const manufactureUseCase = require("../usecase/manufacture");

exports.getManufactures = async (req, res, next) => {
    try {
        const data = await manufactureUseCase.getManufactures();

        res.status(200).json({
            message: "Successfully retrieved all manufactures",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getManufacture = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await manufactureUseCase.getManufacture(id);

        res.status(200).json({
            message: `Successfully retrieved manufacture with id ${id}`,
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createManufacture = async (req, res, next) => {
    try {
        const name = req.body.name;
        const userID = req.user.id;

        // Request Validation
        if (!name || name == "") {
            return next({
                message: "name is required",
                statusCode: 404,
            });
        }

        const data = await manufactureUseCase.createManufacture({
            name,
            createdBy: userID,
        });

        res.status(201).json({
            message: "Manufacture created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateManufacture = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const userID = req.user.id;

        if (!name || name === "") {
            return next({
                message: "name is required",
                statusCode: 404,
            });
        }

        const data = await manufactureUseCase.updateManufacture(id, {
            name,
            lastUpdatedBy: userID,
        });

        res.status(200).json({
            message: `Successfully updated manufacture with id ${id}`,
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteManufacture = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userID = req.user.id;

        await manufactureUseCase.updateManufacture(id, {
            deletedBy: userID,
        });

        const data = await manufactureUseCase.deleteManufacture(id);

        res.status(200).json({
            message: `Successfully deleted manufacture with id ${id}`,
            data,
        });
    } catch (error) {
        next(error);
    }
};
