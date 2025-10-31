import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Just a single string prompt
    const result = await model.generateContent(message);

    // Always return text as { reply: ... }
    return NextResponse.json({ reply: result.response.text() });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    return NextResponse.json({ reply: "Error contacting AI" }, { status: 500 });
  }
}
