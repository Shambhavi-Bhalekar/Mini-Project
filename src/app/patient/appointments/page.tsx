//@ts-nocheck
'use client';

import { Calendar, Clock } from "lucide-react";
import PatientAppointmentList from "@/components/patient/Appointments/PatientAppointmentList";
import BookingModal from "@/components/patient/Appointments/BookingModal";
import useDoctorData from "@/hooks/useDoctorData";
import usePatientAppointments from "@/hooks/usePatientAppointments";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function AppointmentPage() {
  const { appointments } = usePatientAppointments();
  const { doctors, recentDoctors, loadingDoctors } = useDoctorData();

  const [showBooking, setShowBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [reschedulingAppt, setReschedulingAppt] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("all");

  const handleCancelAppointment = async (id) => {
    try {
      await deleteDoc(doc(db, "appointments", id));
      toast.success("Appointment cancelled.");
    } catch {
      toast.error("Failed to cancel appointment.");
    }
  };

  const handleRescheduleAppointment = (appt) => {
    const doctor = doctors.find((d) => d.id === appt.doctorId);
    if (!doctor) return toast.error("Doctor not found");

    setSelectedDoctor(doctor);
    setReschedulingAppt(appt);
    setShowBooking(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-500" />
            My Appointments
          </h1>

          <button
            onClick={() => {
              setShowBooking(true);
              setSelectedDoctor(null);
              setReschedulingAppt(null);
            }}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow"
          >
            <Clock className="w-5 h-5 inline mr-2" />
            Book New Appointment
          </button>
        </div>

        <PatientAppointmentList
          appointments={appointments}
          onReschedule={handleRescheduleAppointment}
          onCancel={handleCancelAppointment}
        />

        <BookingModal
          showBooking={showBooking}
          setShowBooking={setShowBooking}
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
          reschedulingAppt={reschedulingAppt}
          doctors={doctors}
          recentDoctors={recentDoctors}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterSpecialization={filterSpecialization}
          setFilterSpecialization={setFilterSpecialization}
          loadingDoctors={loadingDoctors}
        />
      </div>
    </div>
  );
}
