import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { goal } = await req.json();

    if (!goal) {
      return NextResponse.json(
        { error: "Goal is required." },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: `
You are an expert productivity coach.

Generate exactly 4 milestones.

Each milestone must contain exactly 3 actionable tasks.

Return ONLY valid JSON.

Example:

{
  "milestones": [
    {
      "title": "Learn Basics",
      "tasks": [
        "Task 1",
        "Task 2",
        "Task 3"
      ]
    }
  ]
}

Do not use markdown.
Do not include explanations.
          `,
        },
        {
          role: "user",
          content: `Create a detailed roadmap for: ${goal}`,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content ?? "";

    let roadmap;

    try {
      roadmap = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          error: "AI returned invalid JSON.",
          raw: text,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(roadmap);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Failed to generate roadmap.",
      },
      {
        status: 500,
      }
    );
  }
}