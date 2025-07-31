import { Router } from "express";
import { storage } from "../middlewares/multerupload.ts";
import { uploadCSVTaskAlloc } from "../controllers/uploadCSVTaskAlloc.ts";

const router = Router();

router.post("/uploadCSV", storage.single("csvfile"), uploadCSVTaskAlloc);
export default router;
