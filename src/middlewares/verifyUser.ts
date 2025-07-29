import type { Request, Response, NextFunction } from "express";

export function verifyUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (email === "admin@test.com" && password === "123456") {
      res.locals.user = { email, role: "admin" };
      return next();
    }
    return res.status(401).json({ message: "Invalid Creds" });
  }

  // TODo Validatation and sanitization middleware prior to this middleware
  // Might need to refactor this later as this is a db retrieval and check if user exists 