import { Request, Response, NextFunction } from "express";

/**
 * Simple API key / bearer token check middleware.
 * Expects header: Authorization: Bearer <API_KEY>
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.replace("Bearer ", "").trim();
  const validKey = process.env.API_KEY; // loaded from .env or .env.test

  if (!validKey || token !== validKey) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  next();
}