import express from "express";

const app = express();

// ✅ Single declaration
const PORT = process.env.PORT || 3000;

app.get("/health", (_, res) => res.json({ status: "ok" }));
// ✅ Add a ping route for Render health checks
app.get("/ping", (req, res) => {
  res.status(200).json({ status: "ok", message: "pong" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Caption Generator API is live Try It Now");
});


