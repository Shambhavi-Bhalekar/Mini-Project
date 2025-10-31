//@ts-nocheck
"use client";
import React from 'react';
import { Upload, FileText, X } from 'lucide-react';

export default function PrescriptionsSection({ prescriptions, setPrescriptions, setShowModal }) {
  const removeFile = (index) => {
    setPrescriptions((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <label className="text-lg font-medium text-blue-700">Prescriptions</label>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Upload size={18} className="mr-2" />
          Upload Prescriptions
        </button>
      </div>

      {prescriptions.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-medium text-blue-700 mb-2">Uploaded Prescriptions:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {prescriptions.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-blue-50 p-3 rounded border border-blue-200"
              >
                <div className="flex items-center">
                  <FileText size={20} className="text-blue-600 mr-2" />
                  <span className="truncate max-w-xs">{file.name}</span>
                </div>
                <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
