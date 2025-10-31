// components/patient/HeaderPatient.tsx
'use client';

import Link from 'next/link';

interface HeaderPatientProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function HeaderPatient({ sidebarOpen, setSidebarOpen }: HeaderPatientProps) {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden mr-3 p-1 rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link href="/landing" className="text-xl font-bold">
            MediMitra
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Patient Dashboard</span>
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-blue-700 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12h0z" />
              </svg>
            </button>
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </div>
    </header>
  );
}