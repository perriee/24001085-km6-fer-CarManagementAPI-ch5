const carUseCase = require("../usecase/car");
const manufactureUseCase = require("../usecase/manufacture");
const typeUseCase = require("../usecase/type");
const sizeUseCase = require("../usecase/size");
const transmissionUseCase = require("../usecase/transmission");

exports.getCars = async (req, res, next) => {
    const { name, size } = req.query;

    try {
        const data = await carUseCase.getCars(name, size);

        res.status(200).json({
            message: "Successfully retrieved all cars",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getCar = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await carUseCase.getCar(id);

        res.status(200).json({
            message: `Successfully retrieved car with id ${id}`,
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createCar = async (req, res, next) => {
    try {
        const {
            name,
            plate,
            model,
            rentPerDay,
            year,
            available,
            manufacture_id,
            type_id,
            size_id,
            transmission_id,
        } = req.body;
        const userID = req.user.id;

        let image;
        if (req.files) {
            image = req.files.image;
        }

        // Request Validation
        if (!name || name == "") {
            return next({
                message: "name is required",
                statusCode: 404,
            });
        }

        if (!plate || plate == "") {
            return next({
                message: "plate is required",
                statusCode: 404,
            });
        }

        if (!model || model == "") {
            return next({
                message: "model is required",
                statusCode: 404,
            });
        }

        if (!rentPerDay) {
            return next({
                message: "rentPerDay is required",
                statusCode: 404,
            });
        }

        if (!year) {
            return next({
                message: "year is required",
                statusCode: 404,
            });
        }

        if (!available) {
            return next({
                message: "available is required",
                statusCode: 404,
            });
        }

        if (!manufacture_id) {
            return next({
                message: "manufacture_id is required",
                statusCode: 404,
            });
        }
        const manufactureExist = await manufactureUseCase.getManufacture(manufacture_id);
        if (!manufactureExist) {
            return next({
                message: `Manufacture with id ${manufacture_id} is not found!`,
                statusCode: 404,
            });
        }

        if (!type_id) {
            return next({
                message: "type_id is required",
                statusCode: 404,
            });
        }
        const typeExist = await typeUseCase.getType(type_id);
        if (!typeExist) {
            return next({
                message: `Type with id ${manufacture_id} is not found!`,
                statusCode: 404,
            });
        }

        if (!size_id) {
            return next({
                message: "size_id is required",
                statusCode: 404,
            });
        }
        const sizeExist = await sizeUseCase.getSize(size_id);
        if (!sizeExist) {
            return next({
                message: `Size with id ${manufacture_id} is not found!`,
                statusCode: 404,
            });
        }

        if (!transmission_id) {
            return next({
                message: "transmission_id is required",
                statusCode: 404,
            });
        }
        const transmissionExist = await transmissionUseCase.getTransmission(transmission_id);
        if (!transmissionExist) {
            return next({
                message: `Transmission with id ${manufacture_id} is not found!`,
                statusCode: 404,
            });
        }

        const data = await carUseCase.createCar({
            name,
            plate,
            model,
            image,
            rentPerDay,
            year,
            available,
            manufacture_id,
            type_id,
            size_id,
            transmission_id,
            createdBy: userID,
        });

        res.status(201).json({
            message: "Car created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateCar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userID = req.user.id;

        const {
            name,
            plate,
            model,
            rentPerDay,
            year,
            available,
            manufacture_id,
            type_id,
            size_id,
            transmission_id,
        } = req.body;

        let image;
        if (req.files) {
            image = req.files.image;
        }

        // Request Validation
        if (!name || name == "") {
            return next({
                message: "name is required",
                statusCode: 404,
            });
        }

        if (!plate || plate == "") {
            return next({
                message: "plate is required",
                statusCode: 404,
            });
        }

        if (!model || model == "") {
            return next({
                message: "model is required",
                statusCode: 404,
            });
        }

        if (!rentPerDay) {
            return next({
                message: "rentPerDay is required",
                statusCode: 404,
            });
        }

        if (!year) {
            return next({
                message: "year is required",
                statusCode: 404,
            });
        }

        if (!available) {
            return next({
                message: "available is required",
                statusCode: 404,
            });
        }

        if (!manufacture_id) {
            return next({
                message: "manufacture_id is required",
                statusCode: 404,
            });
        }
        const manufactureExist = await manufactureUseCase.getManufacture(manufacture_id);
        if (!manufactureExist) {
            return next({
                message: `Manufacture with id ${manufacture_id} is not found!`,
                statusCode: 404,
            });
        }

        if (!type_id) {
            return next({
                message: "type_id is required",
                statusCode: 404,
            });
        }
        const typeExist = await typeUseCase.getType(type_id);
        if (!typeExist) {
            return next({
                message: `Type with id ${manufacture_id} is not found!`,
                statusCode: 404,
            });
        }

        if (!size_id) {
            return next({
                message: "size_id is required",
                statusCode: 404,
            });
        }
        const sizeExist = await sizeUseCase.getSize(size_id);
        if (!sizeExist) {
            return next({
                message: `Size with id ${manufacture_id} is not found!`,
                statusCode: 404,
            });
        }

        if (!transmission_id) {
            return next({
                message: "transmission_id is required",
                statusCode: 404,
            });
        }
        const transmissionExist = await transmissionUseCase.getTransmission(transmission_id);
        if (!transmissionExist) {
            return next({
                message: `Transmission with id ${manufacture_id} is not found!`,
                statusCode: 404,
            });
        }

        const data = await carUseCase.updateCar(id, {
            name,
            plate,
            model,
            image,
            rentPerDay,
            year,
            available,
            manufacture_id,
            type_id,
            size_id,
            transmission_id,
            lastUpdatedBy: userID,
        });

        res.status(200).json({
            message: `Successfully updated car with id ${id}`,
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteCar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userID = req.user.id;

        await carUseCase.updateCar(id, {
            deletedBy: userID,
        });

        const data = await carUseCase.deleteCar(id);

        res.status(200).json({
            message: `Successfully deleted car with id ${id}`,
            data,
        });
    } catch (error) {
        next(error);
    }
};
