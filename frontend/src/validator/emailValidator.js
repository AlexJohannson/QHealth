import Joi from "joi";


const emailValidator = Joi.string()
  .email({ tlds: { allow: false } })
  .required();

export { emailValidator };