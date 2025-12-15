import express from "express";

const app = express();

// ✅ Health check route
app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

// ✅ Ping route for Render health checks
app.get("/ping", (_, res) => {
  res.status(200).json({ status: "ok", message: "pong" });
});

// ✅ Root route with API index
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Viral Caption Generator API 🚀",
    endpoints: {
      health: "/health",
      ping: "/ping",
      billing_checkout: "/v1/billing/checkout",
      billing_success: "/v1/billing/success",
      captions_generate: "/v1/captions/generate"
    }
  });
});

// ✅ Docs route with HTML overview
app.get("/docs", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Viral Caption Generator API Docs</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 2rem; background: #fafafa; color: #333; }
        h1 { color: #6c63ff; }
        code { background: #eee; padding: 2px 4px; border-radius: 4px; }
        ul { line-height: 1.8; }
      </style>
    </head>
    <body>
      <h1>📖 Viral Caption Generator API</h1>
      <p>Creator-first API for generating viral captions and handling billing.</p>
      <h2>Available Endpoints</h2>
      <ul>
        <li><code>/</code> – API index</li>
        <li><code>/health</code> – Health check</li>
        <li><code>/ping</code> – Render health check</li>
        <li><code>/v1/billing/checkout</code> – Stripe checkout</li>
        <li><code>/v1/billing/success</code> – Stripe success callback</li>
        <li><code>/v1/captions/generate</code> – Generate viral captions</li>
      </ul>
      <h2>Notes</h2>
      <ul>
        <li>All endpoints return JSON responses.</li>
        <li>Authentication and billing routes require valid API keys and Stripe integration.</li>
        <li>Use <code>POST</code> for caption generation and billing checkout.</li>
      </ul>
    </body>
    </html>
  `);
});

// ✅ Use Render’s injected PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});