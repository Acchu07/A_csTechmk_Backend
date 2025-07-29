import express from "express";
import cookieParser from "cookie-parser";
import auth from "../routes/auth.ts";
import type { Request, Response, NextFunction } from "express";

const port = process.env.PORT ?? "Initial Value is null or undefined";
const secretCookieParser = process.env.COOKIE_PARSER_SECRET ?? "Initial Value is null or undefined";

const app = express();
app.use(express.json());
app.use(cookieParser(secretCookieParser));
app.use("/api/auth", auth);


app.get("/", (req, res) => {
  console.log('Cookies: ', req.cookies)
  console.log('Signed Cookies: ', req.signedCookies)

  res.send("Hello World!");
  console.log("Response sent");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.status(500).send("Something broke!");
});
