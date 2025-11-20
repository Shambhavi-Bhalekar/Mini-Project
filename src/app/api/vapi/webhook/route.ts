// src/app/api/vapi/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Bland AI sends webhook data about call status
    const {
      call_id,
      status,
      duration,
      recording_url,
      transcript,
      summary,
      error_message,
    } = body;

    console.log('Bland AI Webhook received:', {
      call_id,
      status,
      duration,
    });

    // Here you can:
    // 1. Update your database with call results
    // 2. Send notifications to staff
    // 3. Trigger follow-up actions
    // 4. Store transcripts and recordings

    // Example: Save to database (implement your DB logic)
    // await db.calls.update({
    //   where: { callId: call_id },
    //   data: {
    //     status,
    //     duration,
    //     recordingUrl: recording_url,
    //     transcript,
    //     summary,
    //     errorMessage: error_message,
    //     completedAt: new Date(),
    //   },
    // });

    // Example: Send notification if call failed
    if (status === 'failed') {
      console.error(`Call ${call_id} failed:`, error_message);
      // Implement notification logic here
    }

    // Example: Process transcript if call completed
    if (status === 'completed' && transcript) {
      console.log(`Call ${call_id} completed. Transcript:`, transcript);
      // Analyze transcript, extract insights, etc.
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processed successfully' 
    });

  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}