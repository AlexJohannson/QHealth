import Joi from 'joi'

const recipeValidator = Joi.object({
    recipe: Joi.string().required().messages({
        "string.empty": "Recipe is required",
    }),
    description: Joi.string().required().messages({
        "string.empty": "Description is required",
    }),
    user_id: Joi.number().required(),
});

export {recipeValidator};