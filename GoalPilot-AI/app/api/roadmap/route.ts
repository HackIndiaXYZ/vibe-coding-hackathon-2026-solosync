import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request: NextRequest) {
  try {
    const { goal } = await request.json();

    if (!goal || typeof goal !== "string") {
      return NextResponse.json(
        { error: "A valid goal is required." },
        { status: 400 }
      );
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: `You are an expert planning assistant.
Return ONLY valid JSON with:
{
  "summary": "...",
  "milestones": ["...", "...", "..."],
  "daily_actions": ["...", "...", "..."]
}`,
        },
        {
          role: "user",
          content: `Create a roadmap for this goal: "${goal}"`,
        },
      ],
    });

    const result =
      completion.choices[0]?.message?.content ?? "{}";

    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate roadmap." },
      { status: 500 }
    );
  }
}