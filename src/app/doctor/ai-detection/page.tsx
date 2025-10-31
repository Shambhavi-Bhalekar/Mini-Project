//@ts-nocheck
'use client';

import React, { useState } from 'react';
import { Upload, AlertTriangle, CheckCircle, XCircle, RefreshCw } from 'lucide-react'; // Added missing icons
import Link from 'next/link';

export default function AITumorDetection() {
  const [selectedScan, setSelectedScan] = useState(null);

  const pendingReports = [
    { id: 1, patient: 'John Doe', test: 'Blood Test', date: '2025-09-24', urgency: 'medium', aiConfidence: 85 },
    { id: 2, patient: 'Emily Smith', test: 'ECG Report', date: '2025-09-23', urgency: 'high', aiConfidence: 92 },
    { id: 3, patient: 'Michael Brown', test: 'X-Ray', date: '2025-09-22', urgency: 'low', aiConfidence: 78 },
    { id: 4, patient: 'Lisa Wilson', test: 'MRI Scan', date: '2025-09-21', urgency: 'high', aiConfidence: 90 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">AI Tumor Detection</h1>
            <p className="text-gray-500 mt-1">Analyze and review AI-generated scan reports</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Today</p>
            <p className="text-lg font-semibold text-gray-800">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Urgent Flagged Reports */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Urgent Flagged Reports</h3>
          <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="space-y-3">
          {pendingReports.filter(report => report.urgency === 'high').map((report) => (
            <div key={report.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-800">{report.patient}</p>
                  <p className="text-xs text-gray-600">{report.test} • {report.date}</p>
                </div>
              </div>
              <button
                className="text-red-600 hover:text-red-700 text-sm font-medium"
                onClick={() => setSelectedScan(report)}
              >
                Review
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Scan Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Upload New Scan</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Upload className="w-5 h-5" />
            <span>Upload Scan</span>
          </button>
        </div>
        {/* Add scan upload form or content here */}
      </div>

      {/* Scan Review Modal */}
      {selectedScan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">AI Report Analysis</h3>
              <button onClick={() => setSelectedScan(null)} className="text-gray-400 hover:text-gray-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-900">Patient: {selectedScan.patient}</p>
                <p className="text-sm text-gray-600">Test Type: {selectedScan.test}</p>
                <p className="text-sm text-gray-600">Date: {selectedScan.date}</p>
                <p className="text-sm text-gray-600">AI Confidence: {selectedScan.aiConfidence}%</p>
                <p className="text-sm text-gray-600">Urgency: {selectedScan.urgency}</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
                <p className="text-gray-500">Report image placeholder with AI-generated heatmap overlay</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>AI-Generated Report:</strong> Potential issue detected in {selectedScan.test.toLowerCase()}. 
                  Confidence level: {selectedScan.aiConfidence}%. Recommended for {selectedScan.urgency === 'high' ? 'urgent' : 'standard'} review.
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve</span>
                </button>
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Re-analyze</span>
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Flag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}