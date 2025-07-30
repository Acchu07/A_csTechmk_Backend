import {Router} from "express";
import {login} from "../controllers/authLogin.ts";
import { createToken, verifyToken } from "../middlewares/JWT.ts";
import { verifyUser } from "../middlewares/verifyUser.ts";
import { protectedHandler } from "../controllers/testProtected.ts";
import { validateAdmin } from "../middlewares/validator.ts";

const router = Router();

router.post("/login", validateAdmin, verifyUser, createToken, login);
router.get("/protected", verifyToken, protectedHandler);

export default router;

