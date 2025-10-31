'use client';
import { useState, useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface Appointment {
  id: number;
  token: string;
  doctor: string;
  date: string;
  time: string;
  status: 'queued' | 'called' | 'completed';
}

interface QueueTrackerProps {
  appointments: Appointment[];
}

export default function QueueTracker({ appointments }: QueueTrackerProps) {
  const [queueStatus, setQueueStatus] = useState({ ahead: 3, waitTime: 20 }); // Initial mock

  useEffect(() => {
    const interval = setInterval(() => {
      setQueueStatus((prev) => ({
        ahead: Math.max(0, prev.ahead - 1), // Simulate progress
        waitTime: Math.max(0, prev.ahead * 10 - 10),
      }));
    }, 30000); // Update every 30s

    return () => clearInterval(interval);
  }, []);

  if (appointments.length === 0) return null;

  const currentAppt = appointments[0]; // Assume first is current

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
      <div className="flex items-center space-x-3 mb-3">
        <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
        <h3 className="font-bold text-lg text-gray-900">Queue Status</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Patients Ahead</p>
          <p className="text-2xl font-bold text-blue-600">{queueStatus.ahead}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Est. Wait Time</p>
          <p className="text-2xl font-bold text-purple-600">{queueStatus.waitTime} mins</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Your Token</p>
          <p className="text-2xl font-bold text-green-600">{currentAppt.token}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-3">Updates in real-time. Refresh if needed.</p>
    </div>
  );
}