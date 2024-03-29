const { Transmission } = require("../../models");
const { getDataRedis, setDataRedis, deleteDataRedis } = require("../../helper/redis");

exports.getTransmissions = async () => {
    const data = await Transmission.findAll();
    return data;
};

exports.getTransmission = async (id) => {
    const key = `transmissions:${id}`;

    // check redis and if there are any data return data from redis
    let data = await getDataRedis(key);
    if (data) {
        return data;
    }

    // if in the redis not found, we will get from database (postgres) and then save it to redis
    data = await Transmission.findAll({
        where: {
            id,
        },
    });

    if (data.length > 0) {
        // save in the redis if in the postgres is found
        await setDataRedis(key, data[0], 300);

        return data[0];
    }

    throw new Error(`Transmission with id ${id} is not found!`);
};

exports.createTransmission = async (payload) => {
    // create data to postgres
    const data = await Transmission.create(payload);

    // create data to redis
    const key = `transmissions:${data.id}`;
    await setDataRedis(key, data, 300);

    return data;
};

exports.updateTransmission = async (id, payload) => {
    const key = `transmissions:${id}`;

    // update data in postgres
    await Transmission.update(payload, {
        where: { id },
    });

    // get data from postgres
    data = await Transmission.findAll({
        where: {
            id,
        },
    });

    if (data.length > 0) {
        // save to redis (cache)
        await setDataRedis(key, data[0], 300);

        return data[0];
    }

    throw new Error(`Transmission with id ${id} is not found!`);
};

exports.deleteTransmission = async (id) => {
    const key = `transmissions:${id}`;

    // delete from postgres
    const data = await Transmission.destroy({
        where: { id },
    });

    // delete from redis
    await deleteDataRedis(key);

    if (data) return null;

    throw new Error(`Transmission with id ${id} is not found`);
};
