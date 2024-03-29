const { Size } = require("../../models");
const { getDataRedis, setDataRedis, deleteDataRedis } = require("../../helper/redis");

exports.getSizes = async () => {
    const data = await Size.findAll();
    return data;
};

exports.getSize = async (id) => {
    const key = `sizes:${id}`;

    // check redis and if there are any data return data from redis
    let data = await getDataRedis(key);
    if (data) {
        return data;
    }

    // if in the redis not found, we will get from database (postgres) and then save it to redis
    data = await Size.findAll({
        where: {
            id,
        },
    });

    if (data.length > 0) {
        // save in the redis if in the postgres is found
        await setDataRedis(key, data[0], 300);

        return data[0];
    }

    throw new Error(`Size with id ${id} is not found!`);
};

exports.createSize = async (payload) => {
    // create data to postgres
    const data = await Size.create(payload);

    // create data to redis
    const key = `sizes:${data.id}`;
    await setDataRedis(key, data, 300);

    return data;
};

exports.updateSize = async (id, payload) => {
    const key = `sizes:${id}`;

    // update data in postgres
    await Size.update(payload, {
        where: { id },
    });

    // get data from postgres
    data = await Size.findAll({
        where: {
            id,
        },
    });

    if (data.length > 0) {
        // save to redis (cache)
        await setDataRedis(key, data[0], 300);

        return data[0];
    }

    throw new Error(`Size with id ${id} is not found!`);
};

exports.deleteSize = async (id) => {
    const key = `sizes:${id}`;

    // delete from postgres
    const data = await Size.destroy({
        where: { id },
    });

    // delete from redis
    await deleteDataRedis(key);

    if (data) return null;

    throw new Error(`Size with id ${id} is not found`);
};
