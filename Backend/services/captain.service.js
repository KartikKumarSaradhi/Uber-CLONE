const captainModel = require('../models/captain.model');
const bcrypt = require('bcrypt');  // Ensure bcrypt is imported

module.exports.createCaptain = async ({
    firstname, lastname, email, password,
    color, plate, capacity, vehicleType,
}) => {
    // Check for any missing fields and throw an error if any are missing
    if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    // Hash the password before saving it
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new captain in the database
    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password: hashPassword,
        vehicle: {  // Ensure vehicle is properly structured
            color,
            plate,
            capacity,
            vehicleType,
        },
    });

    return captain;
}
