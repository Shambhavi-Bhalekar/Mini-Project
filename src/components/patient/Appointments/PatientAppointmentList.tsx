//@ts-nocheck
import PatientAppointmentCard from "./PatientAppointmentCard";
import { Calendar } from "lucide-react";

export default function PatientAppointmentList({
  appointments,
  onReschedule,
  onCancel,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Upcoming Appointments
      </h2>

      {appointments.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>No appointments scheduled yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((appt) => (
            <PatientAppointmentCard
              key={appt.id}
              appt={appt}
              onReschedule={onReschedule}
              onCancel={onCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
}
