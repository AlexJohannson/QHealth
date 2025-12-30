import Joi from "joi";

const sickLeavesValidator = Joi.object({
    diagnosis: Joi.string().min(1).required().messages({
        "string.empty": "Diagnosis is required",
        "any.required": "Diagnosis is required",
    }),
    description: Joi.string().min(1).required().messages({
        "string.empty": "Description is required",
        "any.required": "Description is required",
    }),
    from_date: Joi.string().min(1).required().messages({
        "string.empty": "From date is required",
        "any.required": "From date is required",
    }),
    to_date: Joi.string().min(1).required().messages({
        "string.empty": "To date is required",
        "any.required": "To date is required",
    }),
}).unknown(true);

export {sickLeavesValidator};