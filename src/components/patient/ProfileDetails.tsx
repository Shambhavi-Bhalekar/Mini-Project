// components/patient/ProfileDetails.tsx
'use client';

interface PatientData {
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
}

interface ProfileDetailsProps {
  patientData: PatientData;
}

export default function ProfileDetails({ patientData }: ProfileDetailsProps) {
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="patient-card gradient-card-blue p-6 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="text-lg font-semibold text-gray-800">{patientData.name}</p>
            </div>
          </div>
        </div>

        <div className="patient-card gradient-card-green p-6 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Blood Group</p>
              <p className="text-lg font-semibold text-gray-800">{patientData.bloodGroup}</p>
            </div>
          </div>
        </div>

        <div className="patient-card gradient-card-purple p-6 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Age</p>
              <p className="text-lg font-semibold text-gray-800">{patientData.age} years</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="medimitra-card bg-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Gender:</span>
              <span className="font-medium text-gray-800">{patientData.gender}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium text-gray-800">{patientData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium text-gray-800">{patientData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Emergency Contact:</span>
              <span className="font-medium text-gray-800">{patientData.emergencyContact}</span>
            </div>
          </div>
        </div>

        <div className="medimitra-card bg-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Address</h3>
          <p className="text-gray-700 leading-relaxed">{patientData.address}</p>
          <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
            Update Address
          </button>
        </div>
      </div>
    </div>
  );
}