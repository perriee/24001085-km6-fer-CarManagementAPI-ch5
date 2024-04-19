const manufactureRepo = require("../../repository/manufacture");

exports.getManufactures = async () => {
    const data = await manufactureRepo.getManufactures();
    return data;
};

exports.getManufacture = async (id) => {
    const data = await manufactureRepo.getManufacture(id);
    return data;
};

exports.createManufacture = async (payload) => {
    const data = await manufactureRepo.createManufacture(payload);
    return data;
};

exports.updateManufacture = async (id, payload) => {
    await manufactureRepo.updateManufacture(id, payload);
    const data = manufactureRepo.getManufacture(id);
    return data;
};

exports.deleteManufacture = async (id) => {
    const data = await manufactureRepo.deleteManufacture(id);
    return data;
};
