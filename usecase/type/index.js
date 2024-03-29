const typeRepo = require("../../repository/type");

exports.getTypes = async () => {
    const data = await typeRepo.getTypes();
    return data;
};

exports.getType = async (id) => {
    const data = await typeRepo.getType(id);
    return data;
};

exports.createType = async (payload) => {
    const data = await typeRepo.createType(payload);
    return data;
};

exports.updateType = async (id, payload) => {
    await typeRepo.updateType(id, payload);
    const data = typeRepo.getType(id);
    return data;
};

exports.deleteType = async (id) => {
    const data = await typeRepo.deleteType(id);
    return data;
};
