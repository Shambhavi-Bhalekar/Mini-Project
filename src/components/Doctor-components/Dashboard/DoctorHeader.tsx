//@ts-nocheck
//@ts-nocheck
'use client';

export default function DoctorHeader({ doctorInfo }) {
  const info = doctorInfo.personalInfo || {};

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-lg font-medium text-blue-600">
              {info.name
                ? info.name.split(" ").map((n) => n[0]).join("")
                : "DR"}
            </span>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">{info.name}</h2>
            <p className="text-sm text-gray-600">
              {info.specialization} • {info.hospital}
            </p>

            <p className="text-sm text-gray-500">
              {info.experience} Experience • {doctorInfo.patientsCount} Patients
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Certifications: {doctorInfo.certifications?.join(", ") || "None"}
            </p>

            <p className="text-sm text-gray-500 mt-1">
                Phone: {info.phone}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-semibold text-gray-800">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
