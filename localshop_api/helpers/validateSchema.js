const Joi = require("joi");

const authSchema = Joi.object({
    userName: Joi.string().required(),
    userEmail: Joi.string().email().lowercase().required(),
    userPassword: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6),
});

module.exports = {authSchema};