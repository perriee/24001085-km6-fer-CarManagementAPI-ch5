const jsonWebToken = require("jsonwebtoken");
const { createAdmin } = require("../../../repository/admin");

exports.createAdmin = async (payload) => {
    let user = await createAdmin(payload);

    // delete password frm object, agar tidak muncul di response
    delete user.dataValues.password;

    // create token
    const jwtPayload = {
        id: user.id,
    };

    const token = jsonWebToken.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "1h" });

    const data = {
        user,
        token,
    };

    return data;
};
