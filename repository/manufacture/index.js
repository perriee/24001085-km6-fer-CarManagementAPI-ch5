const { Manufacture } = require("../../models");
const { getDataRedis, setDataRedis, deleteDataRedis } = require("../../helper/redis");

exports.getManufactures = async () => {
    const data = await Manufacture.findAll();
    return data;
};

exports.getManufacture = async (id) => {
    const key = `manufactures:${id}`;

    // check redis and if there are any data return data from redis
    let data = await getDataRedis(key);
    if (data) {
        return data;
    }

    // if in the redis not found, we will get from database (postgres) and then save it to redis
    data = await Manufacture.findAll({
        where: {
            id,
        },
    });

    if (data.length > 0) {
        // save in the redis if in the postgres is found
        await setDataRedis(key, data[0], 300);

        return data[0];
    }

    throw new Error(`Manufacture with id ${id} is not found!`);
};

exports.createManufacture = async (payload) => {
    // create data to postgres
    const data = await Manufacture.create(payload);

    // create data to redis
    const key = `manufactures:${data.id}`;
    await setDataRedis(key, data, 300);

    return data;
};

exports.updateManufacture = async (id, payload) => {
    const key = `manufactures:${id}`;

    // update data in postgres
    await Manufacture.update(payload, {
        where: { id },
    });

    // get data from postgres
    data = await Manufacture.findAll({
        where: {
            id,
        },
    });

    if (data.length > 0) {
        // save to redis (cache)
        await setDataRedis(key, data[0], 300);

        return data[0];
    }

    throw new Error(`Manufacture with id ${id} is not found!`);
};

exports.deleteManufacture = async (id) => {
    const key = `manufactures:${id}`;

    // delete from postgres
    const data = await Manufacture.destroy({
        where: { id },
    });

    // delete from redis
    await deleteDataRedis(key);

    if (data) return null;

    throw new Error(`Manufacture with id ${id} is not found`);
};
