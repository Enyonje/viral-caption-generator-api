import { Request, Response } from "express";
import { generateCaptionIdeas } from "../services/captionGenerator.service";

export async function generateCaptions(req: Request, res: Response) {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "topic is required" });
    }

    const { source, captions } = await generateCaptionIdeas(topic);

    return res.json({ topic, source, captions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to generate captions" });
  }
}