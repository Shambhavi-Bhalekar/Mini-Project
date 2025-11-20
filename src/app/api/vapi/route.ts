// src/app/api/vapi/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BLAND_API_KEY = process.env.BLAND_API_KEY;
const BLAND_API_URL = 'https://api.bland.ai/v1/calls';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, patientName, appointmentDetails } = body;

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Prepare the call payload for Bland AI
    const callPayload = {
      phone_number: phoneNumber,
      task: `You are a friendly healthcare assistant calling ${patientName || 'the patient'} for a comfort check-in. ${
        appointmentDetails 
          ? `They have an upcoming appointment: ${appointmentDetails}.` 
          : ''
      } Ask how they're feeling, if they have any concerns, and remind them about their appointment if applicable. Be empathetic, warm, and professional.`,
      voice: 'maya', // You can customize the voice
      max_duration: 5, // Max call duration in minutes
      record: true,
      wait_for_greeting: true,
      language: 'en',
    };

    // Make the API call to Bland AI
    const response = await fetch(BLAND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': BLAND_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(callPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Failed to initiate call', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      callId: data.call_id,
      status: data.status,
      message: 'Call initiated successfully',
    });

  } catch (error) {
    console.error('Error initiating Bland AI call:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Get call status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const callId = searchParams.get('callId');

    if (!callId) {
      return NextResponse.json(
        { error: 'Call ID is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${BLAND_API_URL}/${callId}`, {
      method: 'GET',
      headers: {
        'Authorization': BLAND_API_KEY!,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch call status' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching call status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}