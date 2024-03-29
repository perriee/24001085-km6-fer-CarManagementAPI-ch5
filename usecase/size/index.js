const sizeRepo = require("../../repository/size");

exports.getSizes = async () => {
    const data = await sizeRepo.getSizes();
    return data;
};

exports.getSize = async (id) => {
    const data = await sizeRepo.getSize(id);
    return data;
};

exports.createSize = async (payload) => {
    const data = await sizeRepo.createSize(payload);
    return data;
};

exports.updateSize = async (id, payload) => {
    await sizeRepo.updateSize(id, payload);
    const data = sizeRepo.getSize(id);
    return data;
};

exports.deleteSize = async (id) => {
    const data = await sizeRepo.deleteSize(id);
    return data;
};
