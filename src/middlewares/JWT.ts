import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const secretKeyJWT = process.env.JWT_SECRET ?? "Initial Value is null or undefined";
const duration = 7 * 24 * 60 * 60 * 1000;

export function createToken(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;
  jwt.sign(user, secretKeyJWT, { expiresIn: duration }, (err, token) => {
    if (err) return res.status(500).json({ message: "Token Error" });
    res.locals.token = token;
    next();
  });
}


export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.signedCookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, secretKeyJWT, (err: Error | null, decoded: any) => { 
    if (err) return res.status(401).json({ message: "Invalid Token" });
    res.locals.user = decoded;
    next();
  });
}


// ToDo assign decoded a type dont use any