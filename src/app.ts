import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import captionsRouter from "./routes/captions.routes";
import billingRouter from "./routes/billing.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/v1/captions", captionsRouter);
app.use("/v1/billing", billingRouter);

app.get("/health", (_req: Request, res: Response) => res.json({ status: "ok" }));
app.get("/v1/health", (_req: Request, res: Response) => res.json({ status: "ok" }));

export default app;