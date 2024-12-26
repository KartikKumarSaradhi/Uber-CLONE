const captainModel = require('../models/captain.model');
const bcrypt = require('bcrypt');

module.exports.createCaptain = async ({ fullname, email, password, vehicle }) => {
    // Destructure nested fields
    const { firstname, lastname } = fullname || {};
    const { color, plate, capacity, vehicletype } = vehicle || {};
  
    // Validate required fields
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !color ||
      !plate ||
      !capacity ||
      !vehicletype
    ) {
      throw new Error("All fields are required");
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create a new captain document
    const captain = await captainModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: hashedPassword,
      vehicle: {
        color,
        plate,
        capacity,
        vehicletype,
      },
    });
  
    return captain;
  };