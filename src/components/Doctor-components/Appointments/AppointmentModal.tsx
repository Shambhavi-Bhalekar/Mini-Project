//@ts-nocheck
import { Calendar, Clock, Mail, X, CheckCircle } from "lucide-react";

export default function AppointmentModal({
  selectedAppointment,
  setSelectedAppointment,
  calculateAge,
  handleStatusChange,
}) {
  if (!selectedAppointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>

          <button
            onClick={() => setSelectedAppointment(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {selectedAppointment.patientName} ({calculateAge(selectedAppointment.patientdob)} yrs)
            </h3>

            <div className="text-sm text-gray-700 space-y-1">
              <p><Mail className="w-4 h-4 inline mr-1 text-blue-500" /> {selectedAppointment.patientEmail}</p>
              <p><Calendar className="w-4 h-4 inline mr-1 text-blue-500" /> {selectedAppointment.date}</p>
              <p><Clock className="w-4 h-4 inline mr-1 text-blue-500" /> {selectedAppointment.time}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 border-t border-gray-200 pt-4">
            {selectedAppointment.status !== "completed" && (
              <button
                onClick={() => handleStatusChange(selectedAppointment.id, "completed")}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 flex items-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Mark Done</span>
              </button>
            )}

            <button
              onClick={() => setSelectedAppointment(null)}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
