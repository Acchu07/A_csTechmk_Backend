import {Router} from "express";
import { createAgent } from "../controllers/createAgent.ts";
import { validateAgent } from "../middlewares/validator.ts";
import { verifyToken } from "../middlewares/JWT.ts";
import type { Request, Response } from "express";

const router = Router();

router.post("/createAgent", verifyToken, validateAgent, createAgent);


export default router;

