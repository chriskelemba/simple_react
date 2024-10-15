const db = require("../model/dbConnect");
const {authSchema} = require("../helpers/validateSchema");
const {signAccessToken} = require("../helpers/jwtHelper");
const {signRefreshToken} = require("../helpers/jwtHelper");
const createHttpError = require("http-errors");

const user = db.user;

module.exports = {
    // Add User
    addUser: async(req, res, next) => {
        try {
            const {userName, userEmail, userPassword} = await authSchema.validateAsync(req.body);
            const exists = await user.findOne({where: {userEmail}})
            if (exists) {
                throw createError.Conflict(`${userEmail} has already been registered.`)
            }
            const newUser = new user({
                userName,
                userEmail,
                userPassword,
                roleID: 1
            })
            const savedUser = await newUser.save()

            const accessToken = await signAccessToken(savedUser.userID)
            res.status(200).send({accessToken})
        } catch(error) {
            next(error)
        }
    },
    
    // Login User
    loginUser: async (req, res, next) => {
        try {
            const result = await authSchema.validateAsync(req.body);
            const loginUser = await user.findOne({where: {userEmail: result.userEmail}})

            if (!loginUser) throw createHttpError.NotFound("User not registered");

            // Watching the password
            const isMatch = await loginUser.isValidPassword(result.userPassword);
            if (!isMatch) throw createHttpError.Unauthorized("Username/Password is not valid");

            // If password matches, generate token
            const accessToken = await signAccessToken(loginUser.userID);
            const refreshToken = await signRefreshToken(loginUser.userID);
            const roleID = loginUser.roleID;

            res.send({accessToken, refreshToken, roleID})
        } catch (error) {
            if (error.isJoi === true)
                return next(createHttpError.BadRequest("Invalid Username/Password"));
            next(error)
        }
    },
}