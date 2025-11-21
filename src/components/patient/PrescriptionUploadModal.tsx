//@ts-nocheck
"use client";

import React from "react";
import { Upload, FileText, X } from "lucide-react";
import { Client, Storage, ID } from "appwrite";

export default function PrescriptionUploadModal({
  prescriptions,
  setPrescriptions,
  setShowModal,
  saveData,
}) {
  // Appwrite client
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const storage = new Storage(client);

  // Upload file to Appwrite Storage
  const handleFileUpload = async (e) => {
    e.persist?.(); // <-- IMPORTANT (avoid React event pooling)
    const files = Array.from(e.target.files);

    for (const file of files) {
      try {
        // Upload directly — Appwrite supports native File objects
        const uploaded = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_PRESCRIPTIONS!,
          ID.unique(),
          file
        );

        // Public view URL
        const fileUrl =
          `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/` +
          `${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_PRESCRIPTIONS}/files/${uploaded.$id}/view?project=` +
          `${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;

        // Update state (TRIGGERS RERENDER)
        setPrescriptions((prev) => [
          ...prev,
          {
            id: uploaded.$id,
            name: file.name,
            url: fileUrl,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString(),
          },
        ]);
      } catch (err) {
        console.error("UPLOAD ERROR:", err);
        alert("Upload failed: " + err.message);
      }
    }

    // Force UI update for safety
    e.target.value = "";
  };

  const removeFile = (i) => {
    setPrescriptions((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-800">Upload Prescriptions</h2>
          <button onClick={() => setShowModal(false)} className="text-gray-500">
            <X size={24} />
          </button>
        </div>

        {/* Upload box */}
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center mb-6">
          <Upload size={48} className="text-blue-500 mx-auto mb-4" />
          <p className="mb-2 text-blue-800 text-lg">Upload your files</p>

          <input
            type="file"
            id="prescription-upload"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />

          <label
            htmlFor="prescription-upload"
            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
          >
            Select Files
          </label>

          <p className="mt-4 text-sm text-gray-500">PDF, JPG, PNG accepted</p>
        </div>

        {/* File list */}
        {prescriptions.length > 0 && (
          <div>
            <h3 className="text-md font-medium text-blue-700 mb-2">Selected Files</h3>
            <div className="max-h-40 overflow-y-auto mb-4">
              {prescriptions.map((file, index) => (
                <div key={index} className="flex justify-between bg-blue-50 p-2 rounded mb-2">
                  <span>{file.name}</span>
                  <button className="text-red-500" onClick={() => removeFile(index)}>
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 border text-blue-600 rounded"
          >
            Cancel
          </button>
          <button
            onClick={saveData}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}