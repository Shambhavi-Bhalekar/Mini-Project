// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { generateTimeSlots } from '@/app/utils/generateTimeSlots';
import { db, auth } from '@/lib/firebase/firebase';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function BookingForm({ doctor, onBook, onBack, reschedulingAppt }: any) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [user] = useAuthState(auth);
  const [patientProfile, setPatientProfile] = useState<any>(null);

  // ✅ Fetch patient details from "patients" collection
  useEffect(() => {
    if (!user) return;
    const fetchPatientProfile = async () => {
      try {
        const q = query(collection(db, 'patients'), where('uid', '==', user.uid));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setPatientProfile(snapshot.docs[0].data());
        } else {
          console.warn('No patient profile found for this user.');
        }
      } catch (error) {
        console.error('Error fetching patient profile:', error);
      }
    };
    fetchPatientProfile();
  }, [user]);

  // ✅ Pre-fill date/time when rescheduling
  useEffect(() => {
    if (reschedulingAppt) {
      setSelectedDate(reschedulingAppt.date);
      setSelectedTime(reschedulingAppt.time);
    }
  }, [reschedulingAppt]);

  // ✅ Fetch booked slots for selected date
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate) return;
      const q = query(
        collection(db, 'appointments'),
        where('doctorId', '==', doctor.id),
        where('date', '==', selectedDate),
        where('status', 'in', ['pending', 'confirmed'])
      );
      const snapshot = await getDocs(q);
      const booked = snapshot.docs.map((doc) => doc.data().time);
      setBookedSlots(booked);
    };
    fetchBookedSlots();
  }, [selectedDate, doctor.id]);

  // ✅ Available working dates
  const getAvailableDates = () => {
    const available = [];
    const workingDays = doctor.workDetails?.workingDays || [];
    const currentDate = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      if (workingDays.includes(dayName)) {
        available.push({
          date: date.toISOString().split('T')[0],
          dayName,
          displayDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        });
      }
    }
    return available;
  };

  const availableDates = getAvailableDates();

  // ✅ Booking / Rescheduling logic
  const handleBook = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select date and time');
      return;
    }
    if (!user) {
      toast.error('You must be logged in to book an appointment');
      return;
    }
    if (!patientProfile) {
      toast.error('Unable to fetch patient profile');
      return;
    }

    try {
      setLoading(true);

      // ✅ Extract patient name fields
      const patientFirstName = patientProfile.firstName || '';
      const patientLastName = patientProfile.lastName || '';
      const patientdob = patientProfile.dateOfBirth || '';
      const patientName = `${patientFirstName} ${patientLastName}`.trim();
      if (reschedulingAppt) {
        // 🔁 Update existing appointment
        const apptRef = doc(db, 'appointments', reschedulingAppt.id);
        await updateDoc(apptRef, {
          date: selectedDate,
          time: selectedTime,
          updatedAt: serverTimestamp(),
        });
        toast.success('Appointment rescheduled successfully!');
      } else {
        // 🆕 Create new appointment
        const apptRef = doc(collection(db, 'appointments'));
        const apptId = apptRef.id;

        await setDoc(apptRef, {
          apptId,
          doctorId: doctor.id,
          doctorName: doctor.personalInfo?.name || 'Unknown Doctor',
          doctorSpecialization: doctor.personalInfo?.specialization || 'General',
          patientId: user.uid,
          patientEmail: user.email,
          patientdob: patientdob,
          patientFirstName,
          patientLastName,
          patientName,
          patientdob,
          date: selectedDate,
          time: selectedTime,
          status: 'confirmed',
          createdAt: serverTimestamp(),
        });

        toast.success('Appointment booked successfully!');
      }

      onBook?.(doctor.id, selectedDate, selectedTime);
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to save appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <button onClick={onBack} className="text-blue-600 hover:text-blue-700 font-medium mb-4">
        ← Back to Doctors
      </button>

      {/* Doctor Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900">{doctor.personalInfo.name}</h3>
        <p className="text-blue-600 font-medium">{doctor.personalInfo.specialization}</p>
      </div>

      {/* Date Selector */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Date</h3>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {availableDates.map(({ date, dayName, displayDate }) => (
            <button
              key={date}
              onClick={() => {
                setSelectedDate(date);
                setSelectedTime('');
              }}
              className={`p-3 rounded-lg border-2 text-center transition ${
                selectedDate === date
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="text-xs text-gray-600">{dayName.slice(0, 3)}</div>
              <div className="font-semibold">{displayDate}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time Selector */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Time Slot</h3>
          <div className="space-y-4">
            {doctor.workDetails?.morningStartTime && (
              <TimeSlotGroup
                label="Morning"
                start={doctor.workDetails.morningStartTime}
                end={doctor.workDetails.morningEndTime}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                bookedSlots={bookedSlots}
              />
            )}
            {doctor.workDetails?.eveningStartTime && (
              <TimeSlotGroup
                label="Evening"
                start={doctor.workDetails.eveningStartTime}
                end={doctor.workDetails.eveningEndTime}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                bookedSlots={bookedSlots}
              />
            )}
          </div>
        </div>
      )}

      {/* Confirm Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          onClick={handleBook}
          disabled={!selectedDate || !selectedTime || loading}
          className={`px-6 py-3 rounded-lg font-semibold transition flex items-center space-x-2 ${
            selectedDate && selectedTime && !loading
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <CheckCircle className="w-5 h-5" />
          <span>{reschedulingAppt ? 'Reschedule' : 'Confirm Appointment'}</span>
        </button>
      </div>
    </div>
  );
}

function TimeSlotGroup({ label, start, end, selectedTime, setSelectedTime, bookedSlots }: any) {
  const slots = generateTimeSlots(start, end);
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-700 mb-2">
        {label} ({start} - {end})
      </h4>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {slots.map((time) => (
          <TimeButton
            key={time}
            time={time}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            isBooked={bookedSlots.includes(time)}
          />
        ))}
      </div>
    </div>
  );
}

function TimeButton({ time, selectedTime, setSelectedTime, isBooked }: any) {
  const disabled = isBooked;
  return (
    <button
      onClick={() => !disabled && setSelectedTime(time)}
      disabled={disabled}
      className={`p-2 rounded-lg border-2 text-sm transition ${
        disabled
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : selectedTime === time
          ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
          : 'border-gray-200 hover:border-blue-300'
      }`}
    >
      {time}
    </button>
  );
}
