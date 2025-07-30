import express from "express";
import cookieParser from "cookie-parser";
import auth from "../routes/auth.ts";
import cors from "cors";
import {connectDB} from "../db/mongodbConnect.ts";
import { verifyToken } from "../middlewares/JWT.ts";
import type { Request, Response, NextFunction } from "express";

const port = process.env.PORT ?? "Initial Value is null or undefined";
const secretCookieParser = process.env.COOKIE_PARSER_SECRET ?? "Initial Value is null or undefined";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser(secretCookieParser));
app.use("/api/auth", auth);


app.get("/", verifyToken,(req, res) => {
  console.log('Cookies: ', req.cookies)
  console.log('Signed Cookies: ', req.signedCookies)

  res.json("Hello World!");
  console.log("Response sent");
});


app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port ${port}`);
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.status(500).json("Something broke!");
});


//ToDo Check for Any types and remove them or narrow
//ToDO Use Linter and prettier some code is not readable
//ToDo Add an Onclose for graceful close of db