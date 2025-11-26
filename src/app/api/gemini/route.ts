import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
console.log(process.env.GEMINI_API_KEY)

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    console.log(process.env.GEMINI_API_KEY)

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent({
      contents: [
        ...history.map((msg: any) => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        })),
        { role: "user", parts: [{ text: message }] },
      ],
    });

    return NextResponse.json({ reply: result.response.text() });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { reply: "Error talking to Gemini." },
      { status: 500 }
    );
  }
}
