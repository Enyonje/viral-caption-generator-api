import express from "express";

const app = express();

// ✅ Single declaration
const PORT = process.env.PORT || 3000;

app.get("/health", (_, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});