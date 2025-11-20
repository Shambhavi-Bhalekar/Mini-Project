//@ts-nocheck
import AppointmentCard from "./AppointmentCard";
import { Calendar } from "lucide-react";

export default function AppointmentList({ displayedAppointments, setSelectedAppointment, calculateAge }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">

      {displayedAppointments.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>No appointments found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayedAppointments.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appt={appt}
              onClick={() => setSelectedAppointment(appt)}
              calculateAge={calculateAge}
            />
          ))}
        </div>
      )}
    </div>
  );
}
