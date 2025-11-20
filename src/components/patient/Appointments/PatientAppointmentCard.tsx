//@ts-nocheck
import { Calendar, Clock, RotateCcw, Trash2 } from "lucide-react";

export default function PatientAppointmentCard({
  appt,
  onReschedule,
  onCancel,
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition flex justify-between items-center">
      <div>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
          {appt.status || "pending"}
        </span>

        <h3 className="font-semibold text-lg text-gray-900 mt-2">
          Dr. {appt.doctorName}
        </h3>
        <p className="text-sm text-gray-600">
          {appt.doctorSpecialization || "General"}
        </p>

        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {appt.date}
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {appt.time}
          </span>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => onReschedule(appt)}
          className="flex items-center px-3 py-2 border border-yellow-400 text-yellow-600 rounded-lg hover:bg-yellow-50 transition"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reschedule
        </button>

        <button
          onClick={() => onCancel(appt.id)}
          className="flex items-center px-3 py-2 border border-red-400 text-red-600 rounded-lg hover:bg-red-50 transition"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Cancel
        </button>
      </div>
    </div>
  );
}
