// lib/openai.ts
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function summarizeText(text: string) {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant that summarizes notes in 2-3 sentences." },
      { role: "user", content: text },
    ],
    max_tokens: 200,
  });
  return res.choices?.[0]?.message?.content ?? "";
}

export async function improveText(text: string) {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Improve the clarity and grammar of the following note. Return only the improved content." },
      { role: "user", content: text },
    ],
    max_tokens: 800,
  });
  return res.choices?.[0]?.message?.content ?? "";
}

export async function generateTags(text: string) {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Return a JSON array of 3-6 short tags relevant to the text. Example: [\"tag1\",\"tag2\"]" },
      { role: "user", content: text },
    ],
    max_tokens: 200,
  });
  const raw = res.choices?.[0]?.message?.content ?? "[]";
  try { return JSON.parse(raw); } catch { 
    // fallback: simple split
    return raw.split(/\s+/).slice(0,5);
  }
}
