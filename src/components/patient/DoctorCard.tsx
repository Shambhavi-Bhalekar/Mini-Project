// @ts-nocheck
'use client';
import { MapPin, Star } from 'lucide-react';
import { Doctor } from '@/app/patient/appointments/page';

export default function DoctorCard({
  doctor,
  onSelect,
  isRecent = false,
}: {
  doctor: Doctor;
  onSelect: (doctor: Doctor) => void;
  isRecent?: boolean;
}) {
  // Use fallback for name (prevents .split error)
  const doctorName = doctor.personalInfo.name || 'Unknown Doctor';
  const initials = doctorName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={`border rounded-lg p-4 hover:shadow-lg transition cursor-pointer ${
        isRecent ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-white'
      }`}
      onClick={() => onSelect(doctor)}
    >
      {isRecent && (
        <div className="flex items-center text-yellow-600 text-xs font-semibold mb-2">
          <Star className="w-3 h-3 mr-1 fill-yellow-600" />
          Recently Visited
        </div>
      )}

      {/* Doctor Header */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {initials}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-base">{doctorName}</h3>
          <p className="text-sm text-blue-600 font-medium">
            {doctor.personalInfo.specialization || 'Specialization not specified'}
          </p>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="space-y-2 text-sm">
        {doctor.personalInfo.secondarySpecialization && (
          <p className="text-gray-600 text-xs">
            Also: {doctor.personalInfo.secondarySpecialization}
          </p>
        )}
        {doctor.workDetails.hospitalName && (
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-xs">{doctor.workDetails.hospitalName}</span>
          </div>
        )}
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="text-xs text-gray-500">
            {doctor.personalInfo.experience ? `${doctor.personalInfo.experience} yrs exp` : 'Experience N/A'}
          </span>
          {doctor.workDetails.consultationFee && (
            <span className="text-sm font-semibold text-gray-900">
              ₹{doctor.workDetails.consultationFee}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
