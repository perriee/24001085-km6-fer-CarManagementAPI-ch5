const transmissionUseCase = require("../usecase/transmission");

exports.getTransmissions = async (req, res, next) => {
    try {
        const data = await transmissionUseCase.getTransmissions();

        res.status(200).json({
            message: "Successfully retrieved all transmissions",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getTransmission = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await transmissionUseCase.getTransmission(id);

        res.status(200).json({
            message: `Successfully retrieved transmission with id ${id}`,
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createTransmission = async (req, res, next) => {
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

        const data = await transmissionUseCase.createTransmission({
            name,
            createdBy: userID,
        });

        res.status(201).json({
            message: "Transmission created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateTransmission = async (req, res, next) => {
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

        const data = await transmissionUseCase.updateTransmission(id, {
            name,
            lastUpdatedBy: userID,
        });

        res.status(200).json({
            message: `Successfully updated transmission with id ${id}`,
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteTransmission = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userID = req.user.id;

        await transmissionUseCase.updateTransmission(id, {
            deletedBy: userID,
        });

        const data = await transmissionUseCase.deleteTransmission(id);

        res.status(200).json({
            message: `Successfully deleted transmission with id ${id}`,
            data,
        });
    } catch (error) {
        next(error);
    }
};
