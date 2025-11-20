// src/app/patient/profile/page.tsx
'use client';

import { useState } from 'react';

interface CallStatus {
  callId: string;
  status: string;
  message: string;
}

export default function PatientProfilePage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [patientName, setPatientName] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus | null>(null);
  const [error, setError] = useState('');

  const initiateComfortCall = async () => {
    setLoading(true);
    setError('');
    setCallStatus(null);

    try {
      const response = await fetch('/api/vapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          patientName,
          appointmentDetails,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate call');
      }

      setCallStatus({
        callId: data.callId,
        status: data.status,
        message: data.message,
      });

      // Poll for call status updates
      pollCallStatus(data.callId);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const pollCallStatus = async (callId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/vapi?callId=${callId}`);
        const data = await response.json();

        if (data.status === 'completed' || data.status === 'failed') {
          clearInterval(interval);
          setCallStatus(prev => prev ? { ...prev, status: data.status } : null);
        }
      } catch (err) {
        console.error('Error polling call status:', err);
        clearInterval(interval);
      }
    }, 5000); // Poll every 5 seconds

    // Clear interval after 5 minutes
    setTimeout(() => clearInterval(interval), 300000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Patient Profile</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Comfort Call</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient Name
            </label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter patient name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1234567890"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment Details (Optional)
            </label>
            <textarea
              value={appointmentDetails}
              onChange={(e) => setAppointmentDetails(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Follow-up appointment on Dec 25, 2024 at 2:00 PM"
              rows={3}
            />
          </div>

          <button
            onClick={initiateComfortCall}
            disabled={loading || !phoneNumber}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? 'Initiating Call...' : 'Initiate Comfort Call'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {callStatus && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="font-semibold text-green-800 mb-2">Call Status</h3>
            <p className="text-green-700 text-sm">Call ID: {callStatus.callId}</p>
            <p className="text-green-700 text-sm">Status: {callStatus.status}</p>
            <p className="text-green-700 text-sm">{callStatus.message}</p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">ℹ️ About Comfort Calls</h3>
        <p className="text-blue-700 text-sm">
          Comfort calls are automated check-ins with patients to ensure they're doing well,
          answer any questions they might have, and remind them about upcoming appointments.
          The AI assistant will have a warm, empathetic conversation with the patient.
        </p>
      </div>
    </div>
  );
}