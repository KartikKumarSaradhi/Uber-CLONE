const captainModel = require('../models/captain.model'); 
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.registerCaptain = async (req, res, next) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    // Check if captain already exists
    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
      return res.status(400).json({ message: 'Captain already exists with this email' });
    }

    // Hash password
    const hashedPassword = await captainModel.hashPassword(password);

    // Create captain object
    const captain = await captainService.createCaptain({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password: hashedPassword,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicletype: vehicle.vehicletype,
      },
    });

    // Generate token
    const token = jwt.sign({ _id: captain._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    // Send response with captain and token
    return res.status(201).json({
      message: 'Captain registered successfully',
      captain,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.loginCaptain = async (req, res, next) => {

   const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, captain });
};


module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({captain:req.captain});
}

module.exports.logoutCaptain = async (req, res, next) => {
   
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blackListTokenModel.create({token: token});
   
    res.clearCookie('token');

    res.status(200).json({ message: 'Captain logged out' });

}