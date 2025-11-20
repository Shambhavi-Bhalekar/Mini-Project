//@ts-nocheck
// components/ProfileHeader.tsx
'use client';

import Link from 'next/link';

export default function ProfileHeader() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patient Profile</h1>
          <p className="text-gray-500 mt-1">Manage your personal information and medical history</p>
        </div>

        <Link href="/patient/details">
          <button className="medimitra-button-primary px-4 py-2 rounded-lg text-sm font-medium">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
}
