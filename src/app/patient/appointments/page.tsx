//@ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import { Calendar, Clock, Search, X, Star, RotateCcw, Trash2 } from 'lucide-react';
import DoctorCard from '@/components/patient/DoctorCard';
import BookingForm from '@/components/patient/BookingForm';
import { db, auth } from '@/lib/firebase/firebase';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp
} from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [recentDoctors, setRecentDoctors] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [reschedulingAppt, setReschedulingAppt] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('all');
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [user] = useAuthState(auth);

  // ✅ Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'doctors'));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDoctors(data);
        setRecentDoctors(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  // ✅ Live fetch user's appointments
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'appointments'), where('patientId', '==', user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const appts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAppointments(appts.sort((a, b) => (a.date > b.date ? 1 : -1)));
    });
    return () => unsub();
  }, [user]);

  // ✅ Handle booking or rescheduling
  const handleBookAppointment = (doctorId, date, time) => {
    setShowBooking(false);
    setSelectedDoctor(null);
    setReschedulingAppt(null);

    // Once BookingForm completes the Firestore write, 
    // onSnapshot auto-refreshes appointment list — no need to update manually.
  };

  // ✅ Cancel appointment
  const handleCancelAppointment = async (appointmentId) => {
    try {
      await deleteDoc(doc(db, 'appointments', appointmentId));
      toast.success('Appointment cancelled successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to cancel appointment');
    }
  };

  // ✅ Reschedule appointment
  const handleRescheduleAppointment = (appointment) => {
    const doctor = doctors.find((d) => d.id === appointment.doctorId);
    if (!doctor) {
      toast.error('Doctor not found');
      return;
    }
    setSelectedDoctor(doctor);
    setReschedulingAppt(appointment);
    setShowBooking(true);
  };

  // ✅ Filters
  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor.personalInfo?.name?.toLowerCase() || '';
    const specialization = doctor.personalInfo?.specialization?.toLowerCase() || '';
    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      specialization.includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterSpecialization === 'all' ||
      doctor.personalInfo?.specialization === filterSpecialization;
    return matchesSearch && matchesFilter;
  });

  const specializations = Array.from(
    new Set(doctors.map((d) => d.personalInfo?.specialization).filter(Boolean))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-blue-500" />
            <span>My Appointments</span>
          </h1>
          <button
            onClick={() => {
              setShowBooking(true);
              setSelectedDoctor(null);
              setReschedulingAppt(null);
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition flex items-center space-x-2 shadow-lg"
          >
            <Clock className="w-5 h-5" />
            <span>Book New Appointment</span>
          </button>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>

          {appointments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No appointments scheduled yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition flex justify-between items-center"
                >
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {appt.status || 'pending'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      Dr. {appt.doctorName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {appt.doctorSpecialization || 'General'}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {appt.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {appt.time}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleRescheduleAppointment(appt)}
                      className="flex items-center space-x-1 px-3 py-2 border border-yellow-400 text-yellow-600 rounded-lg hover:bg-yellow-50 transition"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reschedule</span>
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(appt.id)}
                      className="flex items-center space-x-1 px-3 py-2 border border-red-400 text-red-600 rounded-lg hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking / Rescheduling Modal */}
        {showBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedDoctor
                    ? reschedulingAppt
                      ? `Reschedule with Dr. ${selectedDoctor.personalInfo?.name || 'Unknown'}`
                      : `Book with Dr. ${selectedDoctor.personalInfo?.name || 'Unknown'}`
                    : 'Select a Doctor'}
                </h2>
                <button
                  onClick={() => {
                    setShowBooking(false);
                    setSelectedDoctor(null);
                    setReschedulingAppt(null);
                  }}
                >
                  <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                </button>
              </div>

              {!selectedDoctor ? (
                <div className="p-6 space-y-6">
                  {/* Search + Filter */}
                  <div className="flex gap-4 flex-wrap">
                    <div className="flex-1 min-w-[250px] relative">
                      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by name or specialization..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={filterSpecialization}
                      onChange={(e) => setFilterSpecialization(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Specializations</option>
                      {specializations.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Recently Visited */}
                  {recentDoctors.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <Star className="w-5 h-5 mr-2 text-yellow-500 fill-yellow-500" /> Recently
                        Visited
                      </h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recentDoctors.map((doctor) => (
                          <DoctorCard
                            key={doctor.id}
                            doctor={doctor}
                            onSelect={setSelectedDoctor}
                            isRecent
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All Doctors */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">All Doctors</h3>

                    {loadingDoctors ? (
                      <p className="text-gray-500">Loading doctors...</p>
                    ) : filteredDoctors.length === 0 ? (
                      <p className="text-gray-500">No doctors found.</p>
                    ) : (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredDoctors.map((doctor) => (
                          <DoctorCard
                            key={doctor.id}
                            doctor={doctor}
                            onSelect={setSelectedDoctor}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <BookingForm
                  doctor={selectedDoctor}
                  onBook={handleBookAppointment}
                  onBack={() => setSelectedDoctor(null)}
                  reschedulingAppt={reschedulingAppt}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
