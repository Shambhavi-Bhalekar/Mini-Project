// src/app/patient/profile/page.tsx
// @ts-nocheck
'use client';

import { useState, useEffect, useRef } from 'react';
import { db, auth } from '@/lib/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function PatientProfilePage() {
  const [user] = useAuthState(auth);

  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [callStatus, setCallStatus] = useState(null);
  const [error, setError] = useState('');

  // Load profile
  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      const ref = doc(db, 'patients', user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setPatientName(`${data.firstName || ''} ${data.lastName || ''}`.trim());
        setPhoneNumber(data.phoneNumber || '');
      }
    };

    loadProfile();
  }, [user]);

  // Initiate call
  const initiateComfortCall = async () => {
    setLoading(true);
    setError('');
    setCallStatus(null);

    try {
      if (!phoneNumber) {
        setError('Phone number is required.');
        setLoading(false);
        return;
      }

      const formattedPhone = phoneNumber.startsWith('+91')
        ? phoneNumber
        : `+91${phoneNumber}`;

      const res = await fetch('/api/vapi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          phoneNumber: formattedPhone, // ⭐ use UI value
          patientName,
        }),
      });

      // prevent HTML parsing error
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('API returned HTML instead of JSON:', text);
        throw new Error('Server error: invalid API response');
      }

      if (!res.ok) throw new Error(data.error || 'Failed to start call');

      setCallStatus({
        callId: data.callId,
        status: data.status,
        message: data.message,
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-6 text-center">Please log in</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Patient Profile</h1>

      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Comfort Call</h2>

        <label className="block text-sm text-gray-700 mb-2">Patient Name</label>
        <input
          className="w-full border p-2 rounded mb-4"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />

        <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
        <input
          className="w-full border p-2 rounded mb-4"
          type="tel"
          value={phoneNumber}
          placeholder="9876543210"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <button
          onClick={initiateComfortCall}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md"
        >
          {loading ? 'Calling…' : 'Start Comfort Call'}
        </button>

        {error && (
          <p className="mt-4 text-red-700 bg-red-50 p-3 rounded">{error}</p>
        )}

        {callStatus && (
          <div className="mt-4 bg-green-50 p-3 rounded border">
            <p><strong>ID:</strong> {callStatus.callId}</p>
            <p><strong>Status:</strong> {callStatus.status}</p>
            <p>{callStatus.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
