import { check, ValidationChain } from "express-validator";

// Signup Validator
export const SignupValidator: ValidationChain[] = [
  check("username")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Username is required")
    .matches(/^[a-zA-Z0-9_]+$/) // Allows only alphanumeric characters and underscores
    .withMessage(
      "Username must be alphanumeric and cannot contain special characters"
    ),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .matches(/(?=.*?[A-Z])/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/(?=.*?[a-z])/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/(?=.*?[0-9])/)
    .withMessage("Password must contain at least one number")
    .matches(/(?=.*?[#?!@$%^&*-])/)
    .withMessage("Password must contain at least one special character")
    .not()
    .matches(/^\s*$/)
    .withMessage("Password cannot be empty or contain only whitespace"),
];

// Transaction Validator
export const TransactionValidator: ValidationChain[] = [
  check("amount")
    .isFloat({ gt: 0 }) // Ensures amount is a positive number
    .withMessage("Amount must be a positive number"),
  check("description")
    .isString()
    .notEmpty()
    .withMessage("Description must be a string"),
  check("type").isString().notEmpty().withMessage("Type must be a string"),
];
