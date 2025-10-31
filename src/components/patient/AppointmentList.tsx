import QueueTracker from './QueueTracker';
/*import { HiOutlineCalendar as CalendarIcon } from "react-icons/hi";*/
import { Calendar as CalendarIcon } from "lucide-react";


interface Appointment {
  id: number;
  token: string;
  doctor: string;
  date: string;
  time: string;
  status: 'queued' | 'called' | 'completed';
}

interface AppointmentListProps {
  appointments: Appointment[];
}

export default function AppointmentList({ appointments }: AppointmentListProps) {
  return (
    <div className="space-y-6">
      {appointments.length > 0 ? (
        <>
          <QueueTracker appointments={appointments} />
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="text-lg font-bold mb-4">Upcoming Appointments</h3>
            <div className="space-y-4">
              {appointments.map((appt) => (
                <div key={appt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <p className="font-semibold">{appt.doctor}</p>
                    <p className="text-sm text-gray-600">{new Date(appt.date).toLocaleDateString()} at {appt.time}</p>
                    <p className="text-xs text-blue-600 font-medium">Token: {appt.token}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    appt.status === 'queued' ? 'bg-yellow-100 text-yellow-800' :
                    appt.status === 'called' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No appointments booked yet.</p>
        </div>
      )}
    </div>
  );
}