// components/patient/ReportUploadModal.tsx
//@ts-nocheck
"use client";
import React, { useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

/**
 * Report object shape saved locally in state:
 * {
 *   name: string,
 *   date: 'YYYY-MM-DD',
 *   type: string,         // user-inferred or file-type
 *   status: 'Pending'|'Uploaded'|...,
 *   file: File (optional) // removed before saving to Firestore
 * }
 */

export default function ReportUploadModal({
  reports,
  setReports,
  setShowReportModal,
  onSave, // callback after saving reports (optional)
}) {
  const [localReports, setLocalReports] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const formatted = files.map((file) => ({
      file,
      name: file.name,
      date: new Date().toISOString().slice(0, 10),
      type: detectReportType(file),
      status: 'Pending',
    }));
    setLocalReports((prev) => [...prev, ...formatted]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []);
    const formatted = files.map((file) => ({
      file,
      name: file.name,
      date: new Date().toISOString().slice(0, 10),
      type: detectReportType(file),
      status: 'Pending',
    }));
    setLocalReports((prev) => [...prev, ...formatted]);
  };

  function detectReportType(file) {
    const name = file.name.toLowerCase();
    if (name.includes('xray') || name.includes('x-ray')) return 'Imaging';
    if (name.includes('ecg') || name.includes('ekg')) return 'Cardiac';
    if (name.includes('blood') || name.includes('cbc') || file.type === 'application/pdf') return 'Lab Report';
    if (file.type.startsWith('image/')) return 'Imaging';
    return 'Report';
  }

  const removeLocal = (index) => {
    setLocalReports((prev) => prev.filter((_, i) => i !== index));
  };

  const saveLocalReports = () => {
    // Append localReports (including `file` object) to main reports state.
    // NOTE: file objects will be removed before saving to Firestore (in page.saveData)
    setReports((prev) => [...prev, ...localReports]);
    if (onSave) onSave();
    setShowReportModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-800">Upload Reports</h2>
          <button onClick={() => setShowReportModal(false)} className="text-gray-600 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        <div
          className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center mb-6"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="mb-4 flex justify-center">
            <Upload size={48} className="text-blue-500" />
          </div>
          <p className="mb-2 text-blue-800 text-lg">Drag and drop files here</p>
          <p className="text-sm text-gray-500 mb-4">or</p>

          <input
            type="file"
            id="report-upload"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor="report-upload"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Browse Files
          </label>

          <p className="mt-4 text-sm text-gray-500">Accepted formats: PDF, JPG, PNG</p>
        </div>

        {localReports.length > 0 && (
          <div className="mb-4">
            <h3 className="text-md font-medium text-blue-700 mb-2">Selected Reports:</h3>
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {localReports.map((report, index) => (
                <li key={index} className="bg-blue-50 p-2 rounded flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText size={16} className="text-blue-600 mr-2" />
                    <div className="min-w-0">
                      <div className="truncate">{report.name}</div>
                      <div className="text-xs text-gray-500">{report.type} • {report.date}</div>
                    </div>
                  </div>

                  <button onClick={() => removeLocal(index)} className="text-red-500 hover:text-red-700">
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowReportModal(false)}
            className="px-4 py-2 border border-blue-300 text-blue-600 rounded hover:bg-blue-50"
          >
            Cancel
          </button>
          <button
            onClick={saveLocalReports}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Reports
          </button>
        </div>
      </div>
    </div>
  );
}
