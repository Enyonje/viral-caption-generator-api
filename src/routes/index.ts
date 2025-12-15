import { Router } from "express";
import captionsRouter from "./captions.routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.use("/captions", captionsRouter);

export default router;