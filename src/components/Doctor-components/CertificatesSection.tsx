//@ts-nocheck
"use client";   
import React from 'react';
import { Award, File, Upload, Download, Trash2 } from 'lucide-react';

export default function CertificatesSection({ certificates, setCertificates, isEditing, setSaveMessage }) {
  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const newDocument = {
        id: certificates.length + 1,
        name: file.name,
        type: type,
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: null,
        issuedBy: 'To be verified',
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        verified: false,
      };
      setCertificates([newDocument, ...certificates]);
      setSaveMessage('Certificate uploaded successfully! Pending verification.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleDeleteCertificate = (id) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
    setSaveMessage('Certificate deleted successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <Award className="w-5 h-5 mr-2 text-blue-600" />
          Medical Certificates & Licenses
        </h2>
        {isEditing && (
          <label className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
            <Upload className="w-5 h-5" />
            <span>Upload Certificate</span>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, 'Certificate')}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </label>
        )}
      </div>
      <div className="space-y-3">
        {certificates.map((cert) => (
          <div key={cert.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <File className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium text-gray-800">{cert.name}</p>
                    {cert.verified && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{cert.type} • {cert.size}</p>
                  <div className="text-xs text-gray-600 space-y-0.5">
                    <p>Issued by: {cert.issuedBy}</p>
                    <p>Issue Date: {cert.issueDate}</p>
                    {cert.expiryDate && <p>Expiry Date: {cert.expiryDate}</p>}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Download className="w-5 h-5" />
                </button>
                {isEditing && (
                  <button onClick={() => handleDeleteCertificate(cert.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
