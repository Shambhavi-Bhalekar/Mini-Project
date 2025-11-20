// src/types/bland.ts

export interface BlandCallRequest {
  phone_number: string;
  task: string;
  voice?: string;
  max_duration?: number;
  record?: boolean;
  wait_for_greeting?: boolean;
  language?: string;
  voice_settings?: {
    speed?: number;
    stability?: number;
  };
  webhook?: string;
  metadata?: Record<string, any>;
}

export interface BlandCallResponse {
  call_id: string;
  status: 'queued' | 'ringing' | 'in-progress' | 'completed' | 'failed';
  created_at: string;
}

export interface BlandCallStatus {
  call_id: string;
  status: 'queued' | 'ringing' | 'in-progress' | 'completed' | 'failed';
  created_at: string;
  started_at?: string;
  completed_at?: string;
  duration?: number;
  recording_url?: string;
  transcript?: string;
  summary?: string;
  error_message?: string;
}

export interface ComfortCallPayload {
  phoneNumber: string;
  patientName?: string;
  appointmentDetails?: string;
  patientId?: string;
}

export interface ComfortCallResponse {
  success: boolean;
  callId: string;
  status: string;
  message: string;
}