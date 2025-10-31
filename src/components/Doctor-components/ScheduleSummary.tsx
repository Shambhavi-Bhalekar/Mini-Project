//@ts-nocheck
"use client";
import React from 'react';
import { Clock } from 'lucide-react';

export default function ScheduleSummary({ workDetails }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-blue-600" />
        Current Schedule Summary
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Working Days</p>
          <p className="text-sm text-gray-600">{workDetails.workingDays.join(', ')}</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Consultation Fee</p>
          <p className="text-sm text-gray-600">₹{workDetails.consultationFee}</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Morning Hours</p>
          <p className="text-sm text-gray-600">{workDetails.morningStartTime} - {workDetails.morningEndTime}</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Evening Hours</p>
          <p className="text-sm text-gray-600">{workDetails.eveningStartTime} - {workDetails.eveningEndTime}</p>
        </div>
        <div className="bg-white rounded-lg p-4 md:col-span-2">
          <p className="text-sm font-medium text-gray-700 mb-2">Practice Location</p>
          <p className="text-sm text-gray-600">{workDetails.hospitalName}</p>
          <p className="text-xs text-gray-500 mt-1">{workDetails.hospitalAddress}</p>
        </div>
      </div>
    </div>
  );
}
