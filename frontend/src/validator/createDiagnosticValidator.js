import Joi from 'joi'

const createDiagnosticValidator = Joi.object({
    modality: Joi.string().required().messages({
        "string.empty": "Modality is required",
    }),
})
export {createDiagnosticValidator};