//@ts-nocheck
import { Calendar, Search } from "lucide-react";

export default function AppointmentFilters({
  activeTab, setActiveTab,
  searchTerm, setSearchTerm,
  filterStatus, setFilterStatus,
  filterDate, setFilterDate,
  displayedCount
}) {
  return (
    <>
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center space-x-3 text-gray-900">
          <Calendar className="w-8 h-8 text-blue-500" />
          <span>Appointments Dashboard</span>
        </h1>

        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === "appointments"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Current
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === "history"
                ? "bg-purple-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            History
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[250px] relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, date or token..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="week">This Week</option>
          <option value="all">All Dates</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All Status</option>
          <option value="queued">Queued</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </>
  );
}
