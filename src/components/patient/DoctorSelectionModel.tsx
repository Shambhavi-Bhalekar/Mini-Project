//@ts-nocheck
import { X, Search, Star } from 'lucide-react';
import DoctorSearchBar from './DoctorSearchBar';
import DoctorGrid from './DoctorGrid';
import RecentlyVisitedDoctors from './RecentlyVisitedDoctors';

export default function DoctorSelectionModal({
  doctors,
  recentDoctors,
  searchTerm,
  onSearchChange,
  filterSpecialization,
  setFilterSpecialization,
  onSelectDoctor,
  onClose,
  loadingDoctors,
  specializations
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b flex justify-between">
          <h2 className="text-2xl font-bold">Select a Doctor</h2>
          <button onClick={onClose}><X className="w-6 h-6 text-gray-600" /></button>
        </div>

        {/* Search Panel */}
        <div className="p-6 space-y-6">
          <DoctorSearchBar
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            filterSpecialization={filterSpecialization}
            setFilterSpecialization={setFilterSpecialization}
            specializations={specializations}
          />

          {/* Recently Visited */}
          <RecentlyVisitedDoctors doctors={recentDoctors} onSelect={onSelectDoctor} />

          {/* All Doctors */}
          <DoctorGrid
            doctors={doctors}
            loading={loadingDoctors}
            onSelect={onSelectDoctor}
          />
        </div>
      </div>
    </div>
  );
}
