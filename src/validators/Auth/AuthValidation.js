const { body, validationResult } = require("express-validator");

/**
 * Validation to validate user login data.
 *
 * @type {Array<Function>} An array of validation functions for validating user login.
 */
const validateUserLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const extractedErrors = {};
      errors.array().forEach((err) => {
        if (!extractedErrors[err.path]) {
          extractedErrors[err.path] = err.msg;
        }
      });

      return res.status(400).json({ errors: extractedErrors });
    }
    next();
  },
];

// Export module
module.exports = {
  validateUserLogin,
};
