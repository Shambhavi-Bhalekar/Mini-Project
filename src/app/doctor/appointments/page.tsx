//@ts-nocheck
'use client';

import AppointmentFilters from '@/components/Doctor-components/Appointments/AppointmentFilters';
import AppointmentList from '@/components/Doctor-components/Appointments/AppointmentList';
import AppointmentModal from '@/components/Doctor-components/Appointments/AppointmentModal';
import useAppointments from '@/hooks/useAppointments';

export default function DoctorAppointments() {
  const {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterDate,
    setFilterDate,
    displayedAppointments,
    selectedAppointment,
    setSelectedAppointment,
    handleStatusChange,
    calculateAge,
  } = useAppointments();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Filters UI */}
        <AppointmentFilters
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          displayedCount={displayedAppointments.length}
        />

        {/* Appointment List */}
        <AppointmentList
          displayedAppointments={displayedAppointments}
          setSelectedAppointment={setSelectedAppointment}
          calculateAge={calculateAge}
        />

        {/* Modal */}
        <AppointmentModal
          selectedAppointment={selectedAppointment}
          setSelectedAppointment={setSelectedAppointment}
          calculateAge={calculateAge}
          handleStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}
