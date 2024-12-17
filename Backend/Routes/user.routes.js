/**
 * Router for user-related operations.
 * Exports an Express Router instance with a POST route for user registration.
 *
 * @module Routes/user.routes
 * @requires express
 * @requires express-validator
 * @requires ../controllers/user.controller
 */

const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const userController = require('../controllers/user.controller');

/**
 * Registers a new user.
 *
 * @name POST /register
 * @function
 * @memberof module:Routes/user.routes
 * @param {string} email - The user's email. Must be a valid email address.
 * @param {object} fullname - The user's full name.
 * @param {string} fullname.firstname - The user's first name. Must be at least 3 characters long.
 * @param {string} password - The user's password. Must be at least 8 characters long.
 * @returns {void}
 */
router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 8 characters long'),
],
userController.registerUser
)

module.exports = router;