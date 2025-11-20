//@ts-nocheck
'use client';

export default function StatCard({ icon, label, value, color }) {
  const bgMap = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-emerald-50 border-emerald-200",
    purple: "bg-purple-50 border-purple-200",
  };

  return (
    <div className={`p-6 rounded-xl border ${bgMap[color]}`}>
      <div className="flex items-center">
        
        {/* Dark icon background like your screenshot */}
        <div className="w-12 h-12 bg-[#3350d2] text-white rounded-lg flex items-center justify-center">
          {icon}
        </div>

        <div className="ml-4">
          <p className="text-sm text-grey-700">{label}</p>
          <p className="text-2xl font-bold text-purple-950">{value}</p>
        </div>

      </div>
    </div>
  );
}
