import Joi from "joi";

const recoveryPasswordEmailValidator = Joi.string()
    .email({tlds: {allow: false}})
    .required()
    .messages({
        "string.empty": "Email is required",
        "string.email": "Please enter a valid email address"
    });
export { recoveryPasswordEmailValidator };