// src/app/api/vapi/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';

// NOTE: Bland may sign webhooks. If Bland provides a secret/signature header,
// validate it here. This example just logs and returns OK.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Bland AI webhook fields (example)
    const {
      call_id,
      status,
      duration,
      recording_url,
      transcript,
      summary,
      error_message,
      phone_number,
    } = body;

    console.log('Bland AI Webhook received:', {
      call_id,
      status,
      duration,
      phone_number,
      recording_url: !!recording_url,
      transcript: transcript ? transcript.slice?.(0, 200) : null,
    });

    // No DB writes per your request — just log and return success.
    // If you later want to store call results, add DB logic here.

    // If call failed, optionally send notifications (not implemented).
    if (status === 'failed') {
      console.error(`Call ${call_id} failed:`, error_message);
      // Optionally trigger notification/email here
    }

    // If completed and transcript present, you could run further processing here.
    if (status === 'completed' && transcript) {
      // e.g., analyze transcript with AI, summarize, etc.
      console.log(`Call ${call_id} completed; transcript length: ${transcript.length}`);
    }

    return NextResponse.json({ success: true, message: 'Webhook processed' });
  } catch (err) {
    console.error('Error processing Bland webhook:', err);
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
  }
}
