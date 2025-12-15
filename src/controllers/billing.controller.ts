import { Request, Response } from "express";
import Stripe from "stripe";

// Initialize Stripe once
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

/**
 * Create a checkout session for a given planId.
 * Expects req.body.planId and a matching STRIPE_PRICE_<PLANID> in env.
 */
export async function createCheckoutSession(req: Request, res: Response) {
  try {
    const { planId } = req.body;

    if (!planId) {
      return res.status(400).json({ error: "planId is required" });
    }

    const priceId = process.env[`STRIPE_PRICE_${planId.toUpperCase()}`];
    if (!priceId) {
      return res
        .status(400)
        .json({ error: `No price configured for planId: ${planId}` });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: "http://localhost:4000/v1/billing/success",
      cancel_url: "http://localhost:4000/v1/billing/cancel",
    });

    return res.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(500).json({ error: "Stripe error" });
  }
}

/**
 * Success handler
 */
export async function checkoutSuccess(_req: Request, res: Response) {
  return res.json({
    status: "success",
    message:
      "Payment completed successfully. Credits have been added to your account.",
  });
}

/**
 * Cancel handler
 */
export async function checkoutCancel(_req: Request, res: Response) {
  return res.json({
    status: "cancelled",
    message: "Payment was cancelled. No charges were made.",
  });
}