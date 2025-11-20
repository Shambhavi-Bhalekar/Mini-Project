//@ts-nocheck
import { X } from "lucide-react";
import DoctorSelector from "./DoctorSelctor";
import BookingForm from "../BookingForm";

export default function BookingModal({
  selectedDoctor,
  setSelectedDoctor,
  showBooking,
  setShowBooking,
  reschedulingAppt,
  doctors,
  recentDoctors,
  searchTerm,
  setSearchTerm,
  filterSpecialization,
  setFilterSpecialization,
  loadingDoctors,
}) {
  if (!showBooking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">

        <div className="sticky top-0 p-6 border-b flex justify-between items-center bg-white">
          <h2 className="text-2xl font-bold">
            {selectedDoctor
              ? reschedulingAppt
                ? `Reschedule with Dr. ${selectedDoctor.personalInfo?.name}`
                : `Book with Dr. ${selectedDoctor.personalInfo?.name}`
              : "Select a Doctor"}
          </h2>

          <button
            onClick={() => {
              setShowBooking(false);
              setSelectedDoctor(null);
            }}
          >
            <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {!selectedDoctor ? (
          <DoctorSelector
            doctors={doctors}
            recentDoctors={recentDoctors}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterSpecialization={filterSpecialization}
            setFilterSpecialization={setFilterSpecialization}
            loading={loadingDoctors}
            setSelectedDoctor={setSelectedDoctor}
          />
        ) : (
          <BookingForm
            doctor={selectedDoctor}
            onBack={() => setSelectedDoctor(null)}
            reschedulingAppt={reschedulingAppt}
          />
        )}
      </div>
    </div>
  );
}
