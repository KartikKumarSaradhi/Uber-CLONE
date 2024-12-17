/**
 * Creates a new user in the database.
 *
 * @param {Object} user - The user object containing the required fields.
 * @param {string} user.firstname - The first name of the user.
 * @param {string} user.lastname - The last name of the user.
 * @param {string} user.email - The email of the user.
 * @param {string} user.password - The password of the user.
 *
 * @throws Will throw an error if any of the required fields are missing.
 *
 * @returns {Promise<Object>} A promise that resolves to the created user object.
 */
const userModel = require('../models/user.model');



module.exports.createUser = async ({
    firstname,lastname, email, password,
})=> {
    if(!firstname || !email || !password){
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
    })
    return user;
}