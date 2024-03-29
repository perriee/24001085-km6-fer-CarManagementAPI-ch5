const manufactureRepo = require("../../repository/manufacture");

exports.getManufactures = async () => {
    const data = await manufactureRepo.getManufactures();
    return data;
};

// exports.getClass = async (id) => {
//     const data = await classRepo.getClass(id);
//     return data;
// };

// exports.createClass = async (payload) => {
//     const data = await classRepo.createClass(payload);
//     return data;
// };

// exports.updateClass = async (id, payload) => {
//     await classRepo.updateClass(id, payload);
//     const data = classRepo.getClass(id);
//     return data;
// };

// exports.deleteClass = async (id) => {
//     const data = await classRepo.deleteClass(id);
//     return data;
// };
