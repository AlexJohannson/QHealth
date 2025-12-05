import Joi from "joi";

const recoveryPasswordValidator = Joi.object({
    password: Joi.string()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.pattern.base":
                "Password must be at least 8 characters long, contain an uppercase letter 'A', a lowercase letter 'a', " +
                "a digit '1', and a special character '@'."
        }),
    confirmPassword: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "any.only": "Passwords do not match",
            "any.required": "Confirm password is required"
        })
});
export {recoveryPasswordValidator};