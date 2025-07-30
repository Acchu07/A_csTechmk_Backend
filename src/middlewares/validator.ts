import { body, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

const minLength = 5;
const phoneLength = 10;

const emailValidator = () => body("email")
  .notEmpty().withMessage("Email is required")
  .isEmail().withMessage("Invalid email format")
  .normalizeEmail();

const passwordValidator = () => body("password")
  .notEmpty().withMessage("Password is required")
  .isLength({ min: minLength }).withMessage(`Password must be at least ${minLength} characters`);

const nameValidator = () => body("name")
  .notEmpty().withMessage("Name is required")
  .isLength({ min: minLength }).withMessage(`Name must be at least ${minLength} characters`);

const mobileValidator = () => body("mobile")
  .notEmpty().withMessage("Mobile number is required")
  .isLength({ min: phoneLength, max: phoneLength }).withMessage(`Mobile must be ${phoneLength} digits`);

const countryCodeValidator = () => body("countryCode")
  .notEmpty().withMessage("Country code is required");


export const validateAdmin = [
  emailValidator(),
  passwordValidator(),
  validationErrors,
];

function validationErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), message: "Use The Official Site To Access the server" });
  }
  next();
}

export const validateAgent = [
  emailValidator(),
  passwordValidator(),
  nameValidator(),
  mobileValidator(),
  countryCodeValidator(),
  validationErrors,
];
