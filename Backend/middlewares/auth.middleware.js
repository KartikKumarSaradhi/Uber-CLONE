const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model');

module.exports.authUser = async (req, res, next) => {
    // console.log('Cookies',req.cookies);
    // console.log('Headers',req.headers.authorization);
    
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    // console.log('token',token);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const isblacklisted = await userModel.findOne({token: token});

    if (isblacklisted) {
        return res.status(401).json({ error: 'Unauthorized: Token is blacklisted' });
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user;       

        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    const isblacklisted = await blackListTokenModel.findOne({ token: token });

    if (isblacklisted) {
        return res.status(401).json({ error: 'Unauthorized: Token is blacklisted' });
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        req.captain = captain;
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
