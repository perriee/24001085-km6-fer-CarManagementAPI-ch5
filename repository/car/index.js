const crypto = require("crypto"); // generate random string
const path = require("path");
const { Op } = require("sequelize");
const { baseQueryOptions } = require("./baseQueryOptions");

// Models
const { Car, Manufacture, Type, Size, Transmission } = require("../../models");

// Helper
const { uploadToCloudinary } = require("../../helper/cloudinary");
const { getDataRedis, setDataRedis, deleteDataRedis } = require("../../helper/redis");

exports.getCars = async (name, sizeName) => {
    let queryOptions = baseQueryOptions;
    let data = [];

    if (name) {
        const cars = await Car.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            ...queryOptions,
        });

        data = cars;
    } else {
        data = await Car.findAll(queryOptions);
    }

    if (sizeName) {
        return data.filter((car) => {
            return car.Size.name === sizeName;
        });
    }

    if (data.length > 0) {
        return data;
    }

    throw new Error(`Car with name ${name} is not found!`);
};

exports.getCar = async (id) => {
    const key = `cars:${id}`;
    let queryOptions = baseQueryOptions;

    // check redis and if there are any data return data from redis
    let data = await getDataRedis(key);
    if (data) {
        return data;
    }

    // if in the redis not found, we will get from database (postgres) and then save it to redis
    data = await Car.findAll({
        where: {
            id,
        },
        ...queryOptions,
    });

    if (data.length > 0) {
        // save in the redis if in the postgres is found
        await setDataRedis(key, data[0], 300);

        return data[0];
    }

    throw new Error(`Car with id ${id} is not found!`);
};

exports.createCar = async (payload) => {
    let queryOptions = baseQueryOptions;

    if (payload.image) {
        // upload image to cloudinary
        const { image } = payload;

        // make unique imageName -> loRem34ipsuM.png
        image.publicId = crypto.randomBytes(16).toString("hex");

        // rename the imageName to unique
        image.name = `${image.publicId}${path.parse(image.name).ext}`;

        // process to upload image
        const imageUpload = await uploadToCloudinary(image);
        payload.image = imageUpload.secure_url;
    }

    // create data to postgres
    let data = await Car.create(payload);
    const id = data.id;

    // get new car complete data include model assosiate
    data = await Car.findAll({
        where: {
            id,
        },
        ...queryOptions,
    });

    // create data to redis
    const key = `cars:${id}`;
    await setDataRedis(key, data[0], 300);

    return data[0];
};

exports.updateCar = async (id, payload) => {
    const key = `cars:${id}`;
    let queryOptions = baseQueryOptions;

    if (payload.image) {
        const { image } = payload;

        // make unique imageName -> loRem34ipsuM.png
        image.publicId = crypto.randomBytes(16).toString("hex");

        // rename the file to unique
        image.name = `${image.publicId}${path.parse(image.name).ext}`;

        // process to upload image
        const imageUpload = await uploadToCloudinary(image);
        payload.image = imageUpload.secure_url;
    }

    // update data in postgres
    await Car.update(payload, {
        where: { id },
    });

    // get data from postgres
    const data = await Car.findAll({
        where: {
            id,
        },
        ...queryOptions,
    });

    if (data.length > 0) {
        // save to redis (cache)
        await setDataRedis(key, data[0], 300);

        return data[0];
    }

    throw new Error(`Car with id ${id} is not found!`);
};

exports.deleteCar = async (id) => {
    const key = `cars:${id}`;

    // delete from postgres
    const data = await Car.destroy({
        where: { id },
    });

    // delete from redis
    await deleteDataRedis(key);

    if (data) return null;

    throw new Error(`Car with id ${id} is not found`);
};
