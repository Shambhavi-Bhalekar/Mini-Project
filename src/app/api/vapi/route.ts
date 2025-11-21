// src/app/api/vapi/route.ts
//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";

const BLAND_API_KEY = process.env.BLAND_API_KEY;
const BLAND_API_URL = "https://api.bland.ai/v1/calls";

export async function POST(request: NextRequest) {
  try {
    const { userId, phoneNumber, patientName } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    if (!phoneNumber) {
      return NextResponse.json({ error: "Phone number missing" }, { status: 400 });
    }

    const payload = {
      phone_number: phoneNumber,
      voice: "e1289219-0ea2-4f22-a994-c542c2a48a0f",
      wait_for_greeting: false,
      record: true,
      model: "base",
      max_duration: 12,
      language: "en",
      answered_by_enabled: true,
      task: `You are Jean, an emotional support assistant who is a therapist for ${patientName}.Do NOT verify the user's identity. 
Do NOT ask for their name. 
Do NOT say you may have dialed a wrong number. if the patient is stress say something that will make the patient feel better`,
    };

    const res = await fetch(BLAND_API_URL, {
      method: "POST",
      headers: {
        Authorization: BLAND_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: "Bland API failed", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      callId: data.call_id,
      status: data.status,
      message: "Comfort call started",
    });

  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request", details: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const callId = req.nextUrl.searchParams.get("callId");
  if (!callId) return NextResponse.json({ error: "callId missing" }, { status: 400 });

  const res = await fetch(`https://api.bland.ai/v1/calls/${callId}`, {
    headers: { Authorization: BLAND_API_KEY! },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
