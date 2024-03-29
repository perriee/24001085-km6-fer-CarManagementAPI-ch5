const { Manufacture } = require("../../models");
const { getDataRedis, setDataRedis, deleteDataRedis } = require("../../helper/redis");

exports.getManufactures = async () => {
    const data = await Manufacture.findAll();
    return data;
};

// exports.getClass = async (id) => {
//     const key = `classes:${id}`;

//     // check redis and if there are any data return data from redis
//     let data = await getDataRedis(key);
//     if (data) {
//         return data;
//     }

//     // if in the redis not found, we will get from database (postgres) and then save it to redis
//     data = await classes.findAll({
//         where: {
//             id,
//         },
//         include: {
//             model: student,
//         },
//     });

//     if (data.length > 0) {
//         // save in the redis if in the postgres is found
//         await setDataRedis(key, data[0], 300);

//         return data[0];
//     }

//     throw new Error(`Class with id ${id} is not found!`);
// };

// exports.createClass = async (payload) => {
//     // create data to postgres
//     const data = await classes.create(payload);

//     // create data to redis
//     const key = `classes:${id}`;
//     await setDataRedis(key, data, 300);

//     return data;
// };

// exports.updateClass = async (id, payload) => {
//     const key = `classes:${id}`;

//     // update data in postgres
//     await classes.update(payload, {
//         where: { id },
//     });

//     // get data from postgres
//     data = await classes.findAll({
//         where: {
//             id,
//         },
//         include: {
//             model: student,
//         },
//     });

//     if (data.length > 0) {
//         // save to redis (cache)
//         await setDataRedis(key, data[0], 300);

//         return data[0];
//     }

//     throw new Error(`Class with id ${id} is not found!`);
// };

// exports.deleteClass = async (id) => {
//     const key = `classes:${id}`;

//     // delete from postgres
//     const data = await classes.destroy({
//         where: { id },
//     });

//     // delete from redis
//     await deleteDataRedis(key);

//     if (data) return null;

//     throw new Error(`Class with id ${id} is not found`);
// };
