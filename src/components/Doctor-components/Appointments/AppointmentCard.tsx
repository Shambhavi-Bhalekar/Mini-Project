//@ts-nocheck
import { CheckCircle } from "lucide-react";

export default function AppointmentCard({ appt, onClick, calculateAge }) {
  return (
    <div
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-4 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {appt.patientName.split(" ").map((n) => n[0]).join("")}
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              {appt.patientName} ({calculateAge(appt.patientdob)} yrs)
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {appt.date} at {appt.time}
            </p>
          </div>
        </div>

        {appt.status !== "completed" && (
          <div className="text-green-500 flex items-center space-x-1">
            <CheckCircle className="w-4 h-4" />
            <span>Mark Done</span>
          </div>
        )}
      </div>
    </div>
  );
}
