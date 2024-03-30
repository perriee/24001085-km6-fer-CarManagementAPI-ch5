const carRepo = require("../../repository/car");

exports.getCars = async (name, size) => {
    const data = await carRepo.getCars(name, size);
    return data;
};

exports.getCar = async (id) => {
    const data = await carRepo.getCar(id);
    return data;
};

exports.createCar = async (payload) => {
    const data = await carRepo.createCar(payload);
    return data;
};

exports.updateCar = async (id, payload) => {
    await carRepo.updateCar(id, payload);
    const data = carRepo.getCar(id);
    return data;
};

exports.deleteCar = async (id) => {
    const data = await carRepo.deleteCar(id);
    return data;
};
