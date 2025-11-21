//@ts-nocheck
"use client";
import React from "react";
import { FileText, Plus, Eye, Download } from "lucide-react";

export default function ReportsSection({ reports = [], setShowReportModal }) {
  return (
    <div className="bg-white border rounded-lg p-6 shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-800">Medical Reports</h2>

        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus size={16} className="mr-2" />
          Upload Report
        </button>
      </div>

      {(!reports || reports.length === 0) ? (
        <p className="text-gray-500">No reports uploaded yet.</p>
      ) : (
        <div className="space-y-3">
          {reports.map((r, index) => (
            <div
              key={index}
              className="flex justify-between bg-blue-50 p-3 rounded items-center"
            >
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-blue-700 mr-3" />
                <div>
                  <p className="font-medium truncate max-w-xs">{r.name}</p>
                  <p className="text-xs text-gray-500">
                    {r.type} • {r.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* VIEW */}
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                  title="View"
                >
                  <Eye size={18} />
                </a>

                {/* DOWNLOAD */}
                <a
                  href={r.url}
                  download={r.name}
                  className="text-green-600 hover:text-green-800"
                  title="Download"
                >
                  <Download size={18} />
                </a>

                {/* STATUS */}
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    r.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
