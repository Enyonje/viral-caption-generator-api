import express, { Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import pino from "pino";

// Load environment variables
dotenv.config();

// Initialize logger
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true }
  }
});

// Create Express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check route
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Example root route
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Viral Caption Generator API is running 🚀" });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;