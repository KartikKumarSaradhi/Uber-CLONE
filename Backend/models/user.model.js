/**
 * User model schema for MongoDB using Mongoose.
 * This schema defines the structure and validation rules for user data.
 *
 * @module models/user.model
 * @requires mongoose
 * @requires bcrypt
 * @requires jsonwebtoken
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * User schema definition.
 *
 * @typedef {Object} UserSchema
 * @property {Object} fullname - User's full name.
 * @property {string} fullname.firstname - User's first name.
 * @property {string} fullname.lastname - User's last name.
 * @property {string} email - User's email address.
 * @property {string} password - User's password.
 * @property {string} socketId - User's socket ID for real-time communication.
 */
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [3, 'First name ,must be of atleast 3 characters'],
        },
        lastname:{
            type: String,
            minlength: [3, 'Last name ,must be of atleast 3 characters'],
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: [5,  ' Email must be of atleast 5 characters long']
    },
    password:{
        type: String,
        required: true,
        select:false,
        minlength: [8, 'Password must be of atleast 8 characters long']
    },
    socketId:{
        type: String,
    },
})

/**
 * Generate a JSON Web Token (JWT) for the user.
 *
 * @function generateAuthToken
 * @memberof module:models/user.model~UserSchema#methods
 * @returns {string} - The generated JWT.
 */
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}

/**
 * Compare a given password with the hashed password.
 *
 * @function comparePassword
 * @memberof module:models/user.model~UserSchema#methods
 * @param {string} password - The password to compare.
 * @returns {boolean} - True if the password matches, false otherwise.
 */
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

/**
 * Hash a given password using bcrypt.
 *
 * @function hashPassword
 * @memberof module:models/user.model~UserSchema#statics
 * @param {string} password - The password to hash.
 * @returns {string} - The hashed password.
 */
userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password,10);
}

/**
 * Create a Mongoose model for the User schema.
 *
 * @type {mongoose.Model<mongoose.Document, mongoose.Model<any, any, any>>}
 */
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;