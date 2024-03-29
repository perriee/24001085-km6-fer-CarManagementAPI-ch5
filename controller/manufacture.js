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
