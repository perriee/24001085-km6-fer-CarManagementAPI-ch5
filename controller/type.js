const typeUseCase = require("../usecase/type");

exports.getTypes = async (req, res, next) => {
    try {
        const data = await typeUseCase.getTypes();

        res.status(200).json({
            message: "Successfully retrieved all types",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getType = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await typeUseCase.getType(id);

        res.status(200).json({
            message: `Successfully retrieved type with id ${id}`,
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createType = async (req, res, next) => {
    try {
        const { name } = req.body;
        const userID = req.user.id;

        // Request Validation
        if (!name || name == "") {
            return next({
                message: "name is required",
                statusCode: 404,
            });
        }

        const data = await typeUseCase.createType({
            name,
            createdBy: userID,
        });

        res.status(201).json({
            message: "Type created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateType = async (req, res, next) => {
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

        const data = await typeUseCase.updateType(id, {
            name,
            lastUpdatedBy: userID,
        });

        res.status(200).json({
            message: `Successfully updated type with id ${id}`,
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteType = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userID = req.user.id;

        await typeUseCase.updateType(id, {
            deletedBy: userID,
        });

        const data = await typeUseCase.deleteType(id);

        res.status(200).json({
            message: `Successfully deleted type with id ${id}`,
            data,
        });
    } catch (error) {
        next(error);
    }
};
