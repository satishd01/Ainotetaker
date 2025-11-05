// app/api/ai/route.ts
import { NextResponse } from "next/server";
import { summarizeText, improveText, generateTags } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const { op, text } = await request.json();
    if (!op || !text) return NextResponse.json({ error: "Missing op/text" }, { status: 400 });

    if (op === "summarize") {
      const summary = await summarizeText(text);
      return NextResponse.json({ result: summary });
    }
    if (op === "improve") {
      const improved = await improveText(text);
      return NextResponse.json({ result: improved });
    }
    if (op === "tags") {
      const tags = await generateTags(text);
      return NextResponse.json({ result: tags });
    }
    return NextResponse.json({ error: "Unknown op" }, { status: 400 });
  } catch (err:any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
