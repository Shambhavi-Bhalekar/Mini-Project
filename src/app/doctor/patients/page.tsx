//@ts-nocheck
'use client';

import React from 'react';

export default function MyPatients() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-800">My Patients</h1>
        <p className="text-gray-500 mt-1">Manage and view patient records.</p>
      </div>
    </div>
  );
}