//@ts-nocheck
"use client";
import React from 'react';
import { Upload, FileText, X } from 'lucide-react';

export default function PrescriptionUploadModal({
  prescriptions,
  setPrescriptions,
  setShowModal,
  saveData,
}) {
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setPrescriptions((prev) => [...prev, ...files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setPrescriptions((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setPrescriptions((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-800">Upload Prescriptions</h2>
          <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
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
            id="prescription-upload"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor="prescription-upload"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Browse Files
          </label>

          <p className="mt-4 text-sm text-gray-500">Accepted formats: PDF, JPG, PNG</p>
        </div>

        {prescriptions.length > 0 && (
          <div>
            <h3 className="text-md font-medium text-blue-700 mb-2">Files to Upload:</h3>
            <div className="max-h-40 overflow-y-auto mb-4">
              <ul className="space-y-2">
                {prescriptions.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-blue-50 p-2 rounded"
                  >
                    <div className="flex items-center">
                      <FileText size={16} className="text-blue-600 mr-2" />
                      <span className="truncate max-w-xs">{file.name}</span>
                    </div>
                    <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 border border-blue-300 text-blue-600 rounded hover:bg-blue-50"
          >
            Cancel
          </button>
          <button
            onClick={saveData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
