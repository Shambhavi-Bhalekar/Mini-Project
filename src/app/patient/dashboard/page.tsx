// app/patient/profile/page.tsx
'use client';

import { useState } from 'react';

export default function PatientProfile() {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample patient data
  const patientData = {
    name: 'John Doe',
    age: 32,
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '+91 98765 43210',
    email: 'john.doe@email.com',
    address: '123 Healthcare Street, Mumbai, Maharashtra 400001',
    emergencyContact: '+91 98765 43211',
  };

  const medicalHistory = [
    { condition: 'Hypertension', diagnosedDate: '2022-03-15', status: 'Ongoing', severity: 'Moderate' },
    { condition: 'Type 2 Diabetes', diagnosedDate: '2021-08-20', status: 'Controlled', severity: 'Mild' },
    { condition: 'Seasonal Allergies', diagnosedDate: '2020-05-10', status: 'Seasonal', severity: 'Mild' },
  ];

  const reports = [
    { name: 'Blood Test Report', date: '2024-01-15', type: 'Lab Report', status: 'Normal' },
    { name: 'Chest X-Ray', date: '2024-01-10', type: 'Imaging', status: 'Clear' },
    { name: 'ECG Report', date: '2023-12-20', type: 'Cardiac', status: 'Normal' },
    { name: 'Diabetes Panel', date: '2023-12-15', type: 'Lab Report', status: 'Controlled' },
  ];

  const allergies = ['Pollen', 'Dust mites', 'Penicillin'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Patient Profile</h1>
            <p className="text-gray-500 mt-1">Manage your personal information and medical history</p>
          </div>
          <button className="medimitra-button-primary px-4 py-2 rounded-lg text-sm font-medium">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'medical', name: 'Medical History' },
              { id: 'reports', name: 'Reports' },
              { id: 'allergies', name: 'Allergies' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-slide-up">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="medimitra-card bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
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

                <div className="medimitra-card bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
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

                <div className="medimitra-card bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
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

              {/* Personal Information */}
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
          )}

          {/* Medical History Tab */}
          {activeTab === 'medical' && (
            <div className="animate-slide-up">
              <div className="space-y-4">
                {medicalHistory.map((condition, index) => (
                  <div key={index} className="medimitra-card bg-white p-4 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{condition.condition}</h4>
                        <p className="text-sm text-gray-600">Diagnosed: {condition.diagnosedDate}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          condition.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' :
                          condition.status === 'Controlled' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {condition.status}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">Severity: {condition.severity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="animate-slide-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map((report, index) => (
                  <div key={index} className="medimitra-card bg-white p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-semibold text-gray-800">{report.name}</h4>
                          <p className="text-xs text-gray-600">{report.type} • {report.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          report.status === 'Normal' || report.status === 'Clear' || report.status === 'Controlled' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Allergies Tab */}
          {activeTab === 'allergies' && (
            <div className="animate-slide-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allergies.map((allergy, index) => (
                  <div key={index} className="medimitra-card bg-red-50 border border-red-200 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.152 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-800">{allergy}</span>
                    </div>
                  </div>
                ))}
                <div className="medimitra-card bg-gray-50 border-2 border-dashed border-gray-300 p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-sm text-gray-600">Add Allergy</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}