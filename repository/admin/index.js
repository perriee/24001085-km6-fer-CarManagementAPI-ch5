const crypto = require("crypto"); // generate random string
const bcrypt = require("bcrypt");
const path = require("path");
const { User } = require("../../models");
const { uploadToCloudinary } = require("../../helper/cloudinary");
const { setDataRedis } = require("../../helper/redis");

exports.createAdmin = async (payload) => {
    // encrypt the password
    payload.password = bcrypt.hashSync(payload.password, 10);

    if (payload.photo) {
        // upload image to cloudinary
        const { photo } = payload;

        // make unique filename -> skdj834833hj.png
        photo.publicId = crypto.randomBytes(16).toString("hex");

        // rename the file to unique
        photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;

        // process to upload image
        const imageUpload = await uploadToCloudinary(photo);
        payload.photo = imageUpload.secure_url;
    }

    // create data to postgres
    const data = await User.create(payload);

    // create data to redis
    const keyID = `users:${data.id}`;
    await setDataRedis(keyID, data, 300);

    const keyEmail = `users:${data.email}`;
    await setDataRedis(keyEmail, data, 300);

    return data;
};
