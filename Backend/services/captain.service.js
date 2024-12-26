const bcrypt = require('bcrypt');
const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({ fullname, email, password, vehicle }) => {
    const { firstname, lastname } = fullname || {};
    const { color, plate, capacity, vehicletype } = vehicle || {};

    if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicletype) {
        throw new Error("All fields are required");
    }

    const captain = captainModel.create({
        fullname: { firstname, lastname },
        email,
        password: hashedPassword,
        vehicle: { color, plate, capacity, vehicletype },
    });

    return captain;
};