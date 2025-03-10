// backend/validators/userValidator.js
const Joi = require("joi");

// Calculate the date 18 years ago from today
const getMinDate = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  return date;
};

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
  role: Joi.string().valid("exporter", "supplier").required().messages({
    "any.only": "Role must be either 'exporter' or 'supplier'",
    "string.empty": "Role is required",
    "any.required": "Role is required",
  }),
});


const updateProfileSchema = Joi.object({
    city: Joi.string().optional().messages({
      "string.empty": "City must be a valid string",
    }),
    cnic: Joi.string()
      .pattern(/^\d{5}-\d{7}-\d{1}$/) // CNIC format: 12345-6789012-3
      .optional()
      .messages({
        "string.empty": "CNIC must be a valid string",
        "string.pattern.base": "CNIC must be in the format 12345-6789012-3",
      }),
    phoneNumber: Joi.string()
      .pattern(/^\+?\d{10,15}$/) // Phone number format: +1234567890 or 1234567890
      .optional()
      .messages({
        "string.empty": "Phone number must be a valid string",
        "string.pattern.base": "Phone number must be between 10 and 15 digits",
      }),
    businessName: Joi.string().optional().messages({
      "string.empty": "Business name must be a valid string",
    }),
    businessAddress: Joi.string().optional().messages({
      "string.empty": "Business address must be a valid string",
    }),
    postalCode: Joi.string()
      .pattern(/^\d{5}$/) // Postal code format: 12345
      .optional()
      .messages({
        "string.empty": "Postal code must be a valid string",
        "string.pattern.base": "Postal code must be 5 digits",
      }),
    bio: Joi.string().optional().messages({
      "string.empty": "Bio must be a valid string",
    }),
    dateOfBirth: Joi.date().iso().max(getMinDate()).optional().messages({
      "date.base": "Date of birth must be a valid date",
      "date.format": "Date of birth must be in ISO format (YYYY-MM-DD)",
      "date.max": "You must be at least 18 years old",
    }),
  });
  

module.exports = { registerSchema,updateProfileSchema };