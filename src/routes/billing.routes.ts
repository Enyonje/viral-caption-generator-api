import { Router } from "express";
import {
  createCheckoutSession,
  checkoutSuccess,
  checkoutCancel,
} from "../controllers/billing.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/checkout", authMiddleware, createCheckoutSession);
router.get("/success", authMiddleware, checkoutSuccess);
router.get("/cancel", authMiddleware, checkoutCancel);

export default router;