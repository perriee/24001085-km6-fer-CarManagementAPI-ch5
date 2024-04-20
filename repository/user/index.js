const crypto = require("crypto"); // generate random string
const bcrypt = require("bcrypt");
const path = require("path");
const { User } = require("../../models");
const { uploadToCloudinary } = require("../../helper/cloudinary");
const { getDataRedis, setDataRedis } = require("../../helper/redis");

exports.createUser = async (payload) => {
    // check if the email already exists
    const existingUser = await User.findOne({ where: { email: payload.email } });
    if (existingUser) {
        throw new Error("Email already exists");
    }

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

exports.getUserByID = async (id) => {
    const key = `users:${id}`;

    // get data from redis
    let data = await getDataRedis(key);
    if (data) {
        return data;
    }

    // get data from db
    data = await User.findAll({
        where: {
            id,
        },
    });
    if (data.length > 0) {
        // save to redis
        await setDataRedis(key, data[0], 300);

        return data[0];
    }

    throw new Error(`User is not found!`);
};

exports.getUserByEmail = async (email) => {
    const key = `users:${email}`;

    // get data from redis
    let data = await getDataRedis(key);
    if (data) {
        return data;
    }

    // get data from db
    data = await User.findAll({
        where: {
            email,
        },
    });
    if (data.length > 0) {
        // save to redis
        await setDataRedis(key, data[0], 300);

        return data[0];
    }

    throw new Error(`User with email ${email} is not found!`);
};
