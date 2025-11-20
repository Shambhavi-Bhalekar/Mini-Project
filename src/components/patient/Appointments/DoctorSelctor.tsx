//@ts-nocheck
import DoctorCard from "../DoctorCard";
import Filters from "./Filters";

export default function DoctorSelector({
  doctors,
  recentDoctors,
  searchTerm,
  setSearchTerm,
  filterSpecialization,
  setFilterSpecialization,
  loading,
  setSelectedDoctor,
}) {
  const specializations = Array.from(
    new Set(doctors.map((d) => d.personalInfo?.specialization).filter(Boolean))
  );

  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor.personalInfo?.name?.toLowerCase() || "";
    const spec = doctor.personalInfo?.specialization?.toLowerCase() || "";
    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      spec.includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterSpecialization === "all" ||
      doctor.personalInfo?.specialization === filterSpecialization;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterSpecialization={filterSpecialization}
        setFilterSpecialization={setFilterSpecialization}
        specializations={specializations}
      />

      {recentDoctors.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-gray-900">Recently Visited</h3>
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
        </>
      )}

      <h3 className="text-lg font-semibold text-gray-900">All Doctors</h3>

      {loading ? (
        <p>Loading doctors...</p>
      ) : filteredDoctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} onSelect={setSelectedDoctor} />
          ))}
        </div>
      )}
    </div>
  );
}
