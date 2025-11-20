//@ts-nocheck
'use client';

export default function AppointmentsPreview({ appointments }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Appointments</h3>

      <div className="space-y-3">
        {appointments.slice(0, 3).map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-xs">
                  {a.patientName?.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800">{a.patientName}</p>
                <p className="text-xs text-gray-600">{a.condition}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">{a.time}</p>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  a.status === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {a.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
