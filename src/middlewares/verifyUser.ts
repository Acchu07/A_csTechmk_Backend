import { checkAdminEmailPresent } from "../db/dbOperations.ts";
import type { Request, Response, NextFunction } from "express";


export async function verifyUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } : {email: string, password: string} = req.body;
    const userPresent = await checkAdminEmailPresent(email);
    if(userPresent === null) return res.status(401).json({ message: "Not There in DB" });
    if (userPresent && verifyPassword(password, userPresent.password)) {
      res.locals.user = { email: userPresent.email, role: userPresent.role };
      return next();
    }
    return res.status(401).json({ message: "Invalid Creds" });
}

function verifyPassword(userPassword: string, dbUserPassword: string) {
    return userPassword === dbUserPassword;
}

// ToDo encrypt password and store and then decrypt Password and verify