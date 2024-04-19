const { createAdmin } = require("../../usecase/auth/admin");

exports.createAdmin = async (req, res, next) => {
    try {
        // get the body
        const { email, password, name } = req.body;

        // get the photo
        const photo = req?.files?.photo;

        // validate request
        if (!email || email == "") {
            return next({
                message: "email is required",
                statusCode: 400,
            });
        }
        if (!password || password == "") {
            return next({
                message: "password is required",
                statusCode: 400,
            });
        }
        if (!name || name == "") {
            return next({
                message: "name is required",
                statusCode: 400,
            });
        }

        const data = await createAdmin({
            email,
            password,
            name,
            photo,
            role: "admin",
        });

        res.status(201).json({
            message: "Admin created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};
