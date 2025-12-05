import Joi from "joi";

const bookingDiagnosticValidator = Joi.object({
    date_time: Joi.string()
        .required()
        .messages({
            "string.empty": "Date & Time is required",
            "any.required": "Date & Time is required"
        })
});

export {bookingDiagnosticValidator};

