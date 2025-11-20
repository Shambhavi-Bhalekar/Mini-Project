// src/hooks/useComfortCall.ts
'use client';

import { useState, useCallback } from 'react';
import type { ComfortCallPayload, ComfortCallResponse } from '@/types/bland';

export function useComfortCall() {
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [callData, setCallData] = useState<ComfortCallResponse | null>(null);

  const initiateCall = useCallback(async (payload: ComfortCallPayload) => {
    setLoading(true);
    setError(null);
    setCallData(null);

    try {
      const response = await fetch('/api/vapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate call');
      }

      setCallData(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCallStatus = useCallback(async (callId: string) => {
    try {
      const response = await fetch(`/api/vapi?callId=${callId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch call status');
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get call status';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setCallData(null);
  }, []);

  return {
    initiateCall,
    getCallStatus,
    reset,
    loading,
    error,
    callData,
  };
}