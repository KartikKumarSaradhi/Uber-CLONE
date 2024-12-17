/**
 * Registers a new user by validating the request body, hashing the password, and creating a new user record.
 *
 * @param {Object} req - The request object containing the user's information.
 * @param {Object} req.body - The user's information.
 * @param {Object} req.body.fullname - The user's full name.
 * @param {string} req.body.fullname.firstname - The user's first name.
 * @param {string} req.body.fullname.lastname - The user's last name.
 * @param {string} req.body.email - The user's email address.
 * @param {string} req.body.password - The user's password.
 * @param {Object} res - The response object.
 * @param {Object} next - The next middleware function in the stack.
 *
 * @returns {Object} - If validation fails, returns a 400 status code with an array of errors.
 * @returns {void} - If successful, does not return anything.
 */
module.exports.registerUser = async (req,res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname, email, password}  = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashedPassword,
    }); 
}

module.exports