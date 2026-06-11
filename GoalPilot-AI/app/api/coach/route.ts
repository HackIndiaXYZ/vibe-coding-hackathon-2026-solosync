import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      messages: [
        {
          role: "system",
          content: `
You are GoalPilot AI Coach.

Your job is to help users:
- Learn new skills
- Plan their studies
- Stay productive
- Break down goals into manageable steps
- Motivate them with practical advice

Give concise, actionable answers in plain text.
Do not use markdown tables.
          `,
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    const answer =
      completion.choices[0]?.message?.content ??
      "Sorry, I couldn't generate a response.";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to contact AI Coach." },
      { status: 500 }
    );
  }
}