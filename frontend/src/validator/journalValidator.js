import Joi from "joi";

const journalValidator = Joi.object({
    diagnosis: Joi.string().required().messages({
        "string.empty": "Diagnosis is required",
    }),
    description: Joi.string().required().messages({
        "string.empty": "Description is required",
    }),
    planning: Joi.string().required().messages({
        "string.empty": "Planning is required",
    }),
    user_id: Joi.number().required(),
});
export {journalValidator};
