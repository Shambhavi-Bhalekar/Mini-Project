//@ts-nocheck
// components/OverviewTab.tsx
'use client';

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}:</span>
      <span className="font-medium text-gray-800">{value || 'Not Provided'}</span>
    </div>
  );
}

export default function OverviewTab({ patientData, age }) {
  const fullName = `${patientData.firstName} ${patientData.lastName}`.trim();

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Full Name */}
        <div className="medimitra-card bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" stroke="currentColor">
                <circle cx="12" cy="8" r="4" />
                <path d="M12 14c-4 0-7 3-7 7h14c0-4-3-7-7-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="text-lg font-semibold text-gray-800">{fullName || 'Not Provided'}</p>
            </div>
          </div>
        </div>

        {/* Blood Group */}
        <div className="medimitra-card bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              🩸
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Blood Group</p>
              <p className="text-lg font-semibold text-gray-800">
                {patientData.bloodGroup || 'Not Provided'}
              </p>
            </div>
          </div>
        </div>

        {/* Age */}
        <div className="medimitra-card bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              🎂
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Age</p>
              <p className="text-lg font-semibold text-gray-800">
                {age ? `${age} years` : 'Not Provided'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="medimitra-card bg-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="space-y-4">
            <InfoRow label="Gender" value={patientData.gender} />
            <InfoRow label="Phone" value={patientData.phoneNumber} />
            <InfoRow label="Email" value={patientData.email} />
            <InfoRow label="Emergency Contact" value={patientData.emergencyContact} />
          </div>
        </div>

        <div className="medimitra-card bg-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Address</h3>
          <p className="text-gray-700">{patientData.address || 'No address provided'}</p>
        </div>
      </div>
    </div>
  );
}
