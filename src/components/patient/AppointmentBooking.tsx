'use client';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import CalendarPicker from './CalendarPicker';
import DoctorPicker from './DoctorPicker';  // New component
import TimeSlotPicker from './TimeSlotPicker';
import BookingConfirmation from './BookingConfirmation';

interface AppointmentBookingProps {
  onBook: (doctor: string, date: string, time: string) => void;
  onClose: () => void;
}

export default function AppointmentBooking({ onBook, onClose }: AppointmentBookingProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Smith - General');
  const [selectedTime, setSelectedTime] = useState('');

  const mockAvailableDates = ['2025-09-23', '2025-09-24', '2025-09-25']; // Tue-Thu after Sep 18, 2025

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setStep(2);
  };

  const handleDoctorSelect = (doctor: string) => {
    setSelectedDoctor(doctor);
    setStep(3);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(4);
  };

  const handleConfirm = () => {
    onBook(selectedDoctor, selectedDate, selectedTime);
  };

  const getSummary = () => {
    const summary: string[] = [];
    if (step >= 3) summary.push(`Date: ${selectedDate}`);
    if (step >= 4) summary.push(`Doctor: ${selectedDoctor}`);
    return summary;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto animate-slideUp">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {step === 1 && 'Select Date'}
              {step === 2 && 'Select Doctor'}
              {step === 3 && 'Select Time'}
              {step === 4 && 'Confirm Booking'}
            </h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 transition">
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          {step > 1 && (
            <p className="text-sm text-gray-600 mt-2">
              {getSummary().join(' | ')}
            </p>
          )}
        </div>

        <div className="p-6 space-y-6">
          {step === 1 && <CalendarPicker availableDates={mockAvailableDates} onSelect={handleDateSelect} />}
          {step === 2 && <DoctorPicker selectedDate={selectedDate} onSelect={handleDoctorSelect} />}
          {step === 3 && <TimeSlotPicker date={selectedDate} doctor={selectedDoctor} onSelect={handleTimeSelect} />}
          {step === 4 && (
            <BookingConfirmation
              doctor={selectedDoctor}
              date={selectedDate}
              time={selectedTime}
              onConfirm={handleConfirm}
              onBack={() => setStep(3)}
            />
          )}
        </div>
      </div>
    </div>
  );
}