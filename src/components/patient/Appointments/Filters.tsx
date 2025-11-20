//@ts-nocheck
import { Search, Star } from "lucide-react";

export default function Filters({
  searchTerm,
  setSearchTerm,
  filterSpecialization,
  setFilterSpecialization,
  specializations,
}) {
  return (
    <div className="flex gap-4 flex-wrap">
      <div className="flex-1 min-w-[250px] relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
        />
      </div>

      <select
        value={filterSpecialization}
        onChange={(e) => setFilterSpecialization(e.target.value)}
        className="px-4 py-2 border rounded-lg"
      >
        <option value="all">All Specializations</option>
        {specializations.map((spec) => (
          <option key={spec}>{spec}</option>
        ))}
      </select>
    </div>
  );
}
