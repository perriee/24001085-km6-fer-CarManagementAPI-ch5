const sizeUseCase = require("../usecase/size");

exports.getSizes = async (req, res, next) => {
    try {
        const data = await sizeUseCase.getSizes();

        res.status(200).json({
            message: "Successfully retrieved all sizes",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getSize = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await sizeUseCase.getSize(id);

        res.status(200).json({
            message: `Successfully retrieved size with id ${id}`,
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createSize = async (req, res, next) => {
    try {
        const { name, capacity } = req.body;

        // Request Validation
        if (!name || name == "") {
            return next({
                message: "name is required",
                statusCode: 404,
            });
        }
        if (!capacity) {
            return next({
                message: "capacity is required",
                statusCode: 404,
            });
        }

        const data = await sizeUseCase.createSize({ name, capacity });

        res.status(201).json({
            message: "Size created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateSize = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, capacity } = req.body;

        if (!name || name === "") {
            return next({
                message: "name is required",
                statusCode: 404,
            });
        }
        if (!capacity) {
            return next({
                message: "capacity is required",
                statusCode: 404,
            });
        }

        const data = await sizeUseCase.updateSize(id, { name, capacity });

        res.status(200).json({
            message: `Successfully updated size with id ${id}`,
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteSize = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await sizeUseCase.deleteSize(id);

        res.status(200).json({
            message: `Successfully deleted size with id ${id}`,
            data,
        });
    } catch (error) {
        next(error);
    }
};
