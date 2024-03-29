const { Type } = require("../../models");
const { getDataRedis, setDataRedis, deleteDataRedis } = require("../../helper/redis");

exports.getTypes = async () => {
    const data = await Type.findAll();
    return data;
};

exports.getType = async (id) => {
    const key = `types:${id}`;

    // check redis and if there are any data return data from redis
    let data = await getDataRedis(key);
    if (data) {
        return data;
    }

    // if in the redis not found, we will get from database (postgres) and then save it to redis
    data = await Type.findAll({
        where: {
            id,
        },
    });

    if (data.length > 0) {
        // save in the redis if in the postgres is found
        await setDataRedis(key, data[0], 300);

        return data[0];
    }

    throw new Error(`Type with id ${id} is not found!`);
};

exports.createType = async (payload) => {
    // create data to postgres
    const data = await Type.create(payload);

    // create data to redis
    const key = `types:${data.id}`;
    await setDataRedis(key, data, 300);

    return data;
};

exports.updateType = async (id, payload) => {
    const key = `types:${id}`;

    // update data in postgres
    await Type.update(payload, {
        where: { id },
    });

    // get data from postgres
    data = await Type.findAll({
        where: {
            id,
        },
    });

    if (data.length > 0) {
        // save to redis (cache)
        await setDataRedis(key, data[0], 300);

        return data[0];
    }

    throw new Error(`Type with id ${id} is not found!`);
};

exports.deleteType = async (id) => {
    const key = `types:${id}`;

    // delete from postgres
    const data = await Type.destroy({
        where: { id },
    });

    // delete from redis
    await deleteDataRedis(key);

    if (data) return null;

    throw new Error(`Type with id ${id} is not found`);
};
