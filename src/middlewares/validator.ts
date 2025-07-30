import { body, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

const minLength = 5;

export const validateAdmin = [
  body("email").notEmpty().isEmail().normalizeEmail(),
  body("password").notEmpty().isLength({ min: minLength }),
  validationErrors,
];

function validationErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({ errors: `Use The Official Site To Access the server` });
  }
  next();
}
