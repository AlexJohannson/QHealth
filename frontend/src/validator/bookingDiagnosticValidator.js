import Joi from "joi";

const bookingDiagnosticValidator = (canSetDateTime) => Joi.object({
  date_time: canSetDateTime
    ? Joi.date().required().messages({
        "date.base": "Date & Time must be a valid date",
        "any.required": "Date & Time is required"
      })
    : Joi.any().strip()
});
export { bookingDiagnosticValidator };
