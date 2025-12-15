import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateCaptionIdeas(
  topic: string
): Promise<{ source: string; captions: string[] }> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OPENAI_API_KEY");
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a viral caption generator for TikTok/Reels/Shorts. Return 5 catchy captions."
        },
        {
          role: "user",
          content: `Generate 5 captions for: ${topic}`
        }
      ]
    });

    const text = response.choices[0].message?.content || "";
    const captions = text.split("\n").filter(line => line.trim() !== "");

    if (captions.length > 0) {
      return { source: "openai", captions };
    }

    throw new Error("Empty captions from OpenAI");
  } catch (err) {
    console.error("Caption generation failed, falling back to mock:", err);

    return {
      source: "mock",
      captions: [
        `🔥 ${topic}? You won’t believe this trick!`,
        `🚀 Stop scrolling — here’s how ${topic} changes everything.`,
        `✨ ${topic} made simple. Try it today.`,
        `💡 Quick tip: ${topic} in 30 seconds.`,
        `🎯 Want better results with ${topic}? Do this now!`
      ]
    };
  }
}