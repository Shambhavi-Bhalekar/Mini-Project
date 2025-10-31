//@ts-nocheck
'use client';
import React from 'react';
import { Activity, Brain, Users, Calendar, MessageCircle, Heart, Bell, AlertTriangle, CheckCircle, XCircle, Eye, TrendingUp } from 'lucide-react';

export default function DoctorDashboard() {
  const doctorInfo = {
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    hospital: 'Apollo Hospital',
    experience: '12 years',
    patients: 156,
    rating: 4.8,
    certifications: ['Fellow of Cardiology', 'Advanced Life Support'],
    email: 'sarah.johnson@apollohospital.com',
    phone: '+91-9876543210',
  };

  const todayAppointments = [
    { id: 1, time: '09:00 AM', patient: 'John Doe', age: 32, condition: 'Hypertension Follow-up', type: 'Follow-up', status: 'confirmed' },
    { id: 2, time: '10:30 AM', patient: 'Emily Smith', age: 28, condition: 'Chest Pain', type: 'Consultation', status: 'confirmed' },
    { id: 3, time: '11:45 AM', patient: 'Michael Brown', age: 45, condition: 'Diabetes Check-up', type: 'Check-up', status: 'pending' },
    { id: 4, time: '02:00 PM', patient: 'Lisa Wilson', age: 38, condition: 'ECG Report Review', type: 'Report Review', status: 'confirmed' },
    { id: 5, time: '03:30 PM', patient: 'David Lee', age: 52, condition: 'Post Surgery Follow-up', type: 'Follow-up', status: 'confirmed' },
  ];

  const pendingReports = [
    { id: 1, patient: 'John Doe', test: 'Blood Test', date: '2025-10-24', urgency: 'medium', aiConfidence: 85 },
    { id: 2, patient: 'Emily Smith', test: 'ECG Report', date: '2025-10-23', urgency: 'high', aiConfidence: 92 },
    { id: 3, patient: 'Michael Brown', test: 'X-Ray', date: '2025-10-22', urgency: 'low', aiConfidence: 78 },
    { id: 4, patient: 'Lisa Wilson', test: 'MRI Scan', date: '2025-10-21', urgency: 'high', aiConfidence: 90 },
  ];

  const notifications = [
    { id: 1, message: 'New patient appointment scheduled for 10:30 AM', time: '1 hour ago', type: 'info' },
    { id: 2, message: 'Urgent report review required for Emily Smith', time: '2 hours ago', type: 'alert' },
    { id: 3, message: 'System update completed successfully', time: '4 hours ago', type: 'success' },
  ];

  return (
    <div className="space-y-6">
      {/* Doctor Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-blue-600">SJ</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{doctorInfo.name}</h2>
              <p className="text-sm text-gray-600">{doctorInfo.specialization} • {doctorInfo.hospital}</p>
              <p className="text-sm text-gray-500">
                {doctorInfo.experience} Experience • {doctorInfo.patients} Patients • {doctorInfo.rating}/5 Rating
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Certifications: {doctorInfo.certifications.join(', ')} • Email: {doctorInfo.email} • Phone: {doctorInfo.phone}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Today</p>
            <p className="text-lg font-semibold text-gray-800">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-800">{todayAppointments.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-800">{doctorInfo.patients}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Reports</p>
              <p className="text-2xl font-bold text-gray-800">{pendingReports.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Rating</p>
              <p className="text-2xl font-bold text-gray-800">{doctorInfo.rating}/5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Notifications</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg ${
                notification.type === 'alert' ? 'bg-red-50' : notification.type === 'success' ? 'bg-green-50' : 'bg-blue-50'
              }`}
            >
              <p className="text-sm text-gray-800">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors text-left">
            <Brain className="w-6 h-6 text-purple-600 mb-2" />
            <p className="text-sm font-medium text-gray-800">Review Scans</p>
          </button>
          <button className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors text-left">
            <Calendar className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-sm font-medium text-gray-800">Manage Appointments</p>
          </button>
          <button className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors text-left">
            <Users className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-sm font-medium text-gray-800">View Patients</p>
          </button>
          <button className="bg-yellow-50 p-4 rounded-lg hover:bg-yellow-100 transition-colors text-left">
            <MessageCircle className="w-6 h-6 text-yellow-600 mb-2" />
            <p className="text-sm font-medium text-gray-800">Community Insights</p>
          </button>
        </div>
      </div>

      {/* Today's Appointments Preview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Today's Appointments</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {todayAppointments.slice(0, 3).map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-xs">
                    {appointment.patient.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{appointment.patient}</p>
                  <p className="text-xs text-gray-600">{appointment.condition}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{appointment.time}</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}