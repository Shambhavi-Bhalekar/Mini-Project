//@ts-nocheck
"use client";
import React from "react";
import { Upload, FileText, X, Eye, Download } from "lucide-react";

export default function PrescriptionsSection({
  prescriptions,
  setPrescriptions,
  setShowModal,
}) {
  const removeFile = (index) => {
    setPrescriptions((prev) => prev.filter((_, i) => i !== index));
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
          <h3 className="text-md font-medium text-blue-700 mb-2">
            Uploaded Prescriptions:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {prescriptions.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-blue-50 p-3 rounded border border-blue-200"
              >
                <div className="flex items-center gap-2">
                  <FileText size={20} className="text-blue-600" />
                  <span className="truncate max-w-xs">{file.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* VIEW */}
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                    title="View"
                  >
                    <Eye size={18} />
                  </a>

                  {/* DOWNLOAD */}
                  <a
                    href={file.url}
                    download={file.name}
                    className="text-green-600 hover:text-green-800"
                    title="Download"
                  >
                    <Download size={18} />
                  </a>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
