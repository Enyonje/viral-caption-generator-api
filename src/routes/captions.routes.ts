import { Router } from "express";
import { generateCaptions } from "../controllers/captions.controller";

const router = Router();

/**
 * POST /v1/captions/generate
 * Body: { topic: string }
 */
router.post("/generate", generateCaptions);

export default router;