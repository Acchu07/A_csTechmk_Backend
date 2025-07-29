
import type { Request, Response } from "express";

const durationTokenCookie = 7 * 24 * 60 * 60 * 1000

export function login(req: Request, res: Response) {
  res
  .status(200)
  .cookie("token", res.locals.token, { httpOnly: true, signed: true, maxAge: durationTokenCookie })
  .json({ message: "Login Success" });
}