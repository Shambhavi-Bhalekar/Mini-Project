//@ts-nocheck
// app/patient/dashboard/components/AppointmentsCard.tsx
import React from 'react';

type Appointment = {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
};

interface Props {
  appointments: Appointment[];
}

export default function AppointmentsCard({ appointments }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
      {appointments.length === 0 ? (
        <p className="text-gray-500 text-sm">No upcoming appointments.</p>
      ) : (
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">{apt.doctorName}</p>
                <p className="text-sm text-gray-600">{apt.specialty}</p>
              </div>
              <div className="text-right text-sm">
                <p className="font-medium">{apt.date}</p>
                <p className="text-gray-600">{apt.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}