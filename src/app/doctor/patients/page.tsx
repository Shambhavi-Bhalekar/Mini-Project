//@ts-nocheck
'use client';

import React, { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  collection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';

import { Search, X } from 'lucide-react';

export default function MyPatients() {
  const [user] = useAuthState(auth);

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recent');
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'appointments'),
      where('doctorId', '==', user.uid),
      where('status', '==', 'completed')
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const allAppts = snapshot.docs.map((doc) => doc.data());

      const unique = new Map();

      allAppts.forEach((appt) => {
        if (!unique.has(appt.patientId)) {
          unique.set(appt.patientId, {
            id: appt.patientId,
            name: appt.patientName,
            email: appt.patientEmail,
            lastVisit: appt.date,
            condition: appt.condition || 'Follow-up'
          });
        }
      });

      setPatients(Array.from(unique.values()));
    });

    return () => unsub();
  }, [user]);

  // Filtering
  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email?.toLowerCase().includes(search.toLowerCase())  );

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'az') return a.name.localeCompare(b.name);
    if (sort === 'za') return b.name.localeCompare(a.name);
    if (sort === 'recent') return new Date(b.lastVisit) - new Date(a.lastVisit);
    return 0;
  });

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-800">My Patients</h1>
        <p className="text-gray-500 mt-1">Patients you have treated so far.</p>
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Search Bar */}
        <div className="relative w-full md:w-1/2">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sort Dropdown */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="recent">Most Recent</option>
          <option value="az">Name A–Z</option>
          <option value="za">Name Z–A</option>
        </select>
      </div>

      {/* Patient Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Treated Patients ({sorted.length})
        </h2>

        {sorted.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No patients found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

            {sorted.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                onClick={() => setSelectedPatient(p)}
              >
                <div className="flex items-center space-x-3">

                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {p.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">{p.name}</p>
                    <p className="text-sm text-gray-600">{p.email}</p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <PatientModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
      )}

    </div>
  );
}


function PatientModal({ patient, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 animate-slide-up">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{patient.name}</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <Detail label="Email" value={patient.email} />
          <Detail label="Last Visit" value={patient.lastVisit} />
          <Detail label="Condition" value={patient.condition} />
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>

      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between text-gray-700">
      <span className="font-medium">{label}:</span>
      <span>{value || '—'}</span>
    </div>
  );
}
