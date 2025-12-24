import Joi from "joi";

const editUsersValidator = Joi.object({
    email: Joi.string()
        .email({tlds: {allow: false}})
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email address",
        }),

    profile: Joi.object({
        name: Joi.string()
            .pattern(/^([A-Z][a-z]{0,29})([ -][A-Z][a-z]{0,29})*$/)
            .required()
            .messages({
                "string.empty": "Name is required",
                "string.pattern.base": "Only alpha characters are allowed.",
            }),

        surname: Joi.string()
            .pattern(/^([A-Z][a-z]{0,29})([ -][A-Z][a-z]{0,29})*$/)
            .required()
            .messages({
                "string.empty": "Surname is required",
                "string.pattern.base": "Only alpha characters are allowed.",
         }),

        phone_number: Joi.string()
            .pattern(/^(?:\+46|0046|0)7\d{8}$/)
            .required()
            .messages({
                "string.empty": "Phone number is required",
                "string.pattern.base": "Enter a valid Swedish mobile number. Allowed formats: +46701234567, +46700000000, " +
                    "or 0701234567.",
         }),

        date_of_birth: Joi.date()
            .iso()
            .required()
            .custom((value, helpers) => {
                const today = new Date();
                const birthDate = new Date(value);

                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }

                if (age < 18) {
                    return helpers.error("any.invalid");
                }
                return value;
            })
            .messages({
                "any.invalid": "You must be at least 18 years old",
                "date.base": "Date of birth must be a valid date",
                "date.format": "Date of birth must be in YYYY-MM-DD format"
            }),

        height: Joi.number()
            .min(1)
            .required()
            .messages({
                "number.base": "Height must be a number",
                "number.min": "Height must be greater than 0",
                "any.required": "Height is required"
            }),

        weight: Joi.number()
            .min(1)
            .required()
            .messages({
                "number.base": "Weight must be a number",
                "number.min": "Weight must be greater than 0",
                "any.required": "Weight is required"
            }),

        street: Joi.string()
            .required()
            .messages({
                "string.empty": "Street is required",
                "string.pattern.base": "Only alpha characters are allowed.",
            }),

        house: Joi.string()
            .required()
            .messages({
                "string.empty": "House is required",
                "string.pattern.base": "House number may contain letters, digits, spaces, dashes, or slashes.",
            }),

        city: Joi.string()
            .required()
            .messages({
                "string.empty": "City is required",
                "string.pattern.base": "Only alpha characters are allowed.",
            }),

        region: Joi.string()
            .required()
            .messages({
                "string.empty": "Region is required",
                "string.pattern.base": "Only alpha characters are allowed.",
            }),

        country: Joi.string()
            .required()
            .messages({
                "string.empty": "Country is required",
                "string.pattern.base": "Only alpha characters are allowed.",
            }),

        gender: Joi.string()
            .valid("Male", "Female")
            .required()
            .messages({
            "any.required": "Gender is required",
            "any.only": "Gender must be either 'Male' or 'Female'",
            "string.empty": "Gender cannot be empty"
        })
    })
        .required()
        .unknown(true),
})
    .unknown(true);

export {editUsersValidator};

