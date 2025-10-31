// components/patient/Reports.tsx
'use client';

interface Report {
  id: string;
  name: string;
  date: string;
  type: 'Lab Report' | 'Imaging' | 'Cardiac' | 'General';
  status: 'Normal' | 'Abnormal' | 'Clear' | 'Controlled' | 'Pending';
  fileSize?: string;
  uploadedBy?: string;
}

interface ReportsProps {
  reports: Report[];
}

export default function Reports({ reports }: ReportsProps) {
  const getReportIcon = (type: Report['type']) => {
    switch (type) {
      case 'Lab Report':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      case 'Imaging':
        return (
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'Cardiac':
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const getStatusStyle = (status: Report['status']) => {
    switch (status) {
      case 'Normal':
      case 'Clear':
      case 'Controlled':
        return 'bg-green-100 text-green-800';
      case 'Abnormal':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewReport = (reportId: string) => {
    // Handle view report logic
    console.log('Viewing report:', reportId);
  };

  const handleDownloadReport = (reportId: string) => {
    // Handle download report logic
    console.log('Downloading report:', reportId);
  };

  if (reports.length === 0) {
    return (
      <div className="animate-slide-up">
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Available</h3>
          <p className="text-gray-500 mb-4">Upload or request reports from your healthcare provider.</p>
          <button className="medimitra-button-primary px-4 py-2 rounded-lg text-sm font-medium">
            Upload Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report) => (
          <div key={report.id} className="report-card medimitra-card bg-white p-4 rounded-lg hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start flex-1">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  {getReportIcon(report.type)}
                </div>
                <div className="ml-3 flex-1">
                  <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{report.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{report.type} • {report.date}</p>
                  {report.fileSize && (
                    <p className="text-xs text-gray-500 mt-1">{report.fileSize}</p>
                  )}
                  {report.uploadedBy && (
                    <p className="text-xs text-gray-500">Uploaded by: {report.uploadedBy}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2 ml-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(report.status)}`}>
                  {report.status}
                </span>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => handleViewReport(report.id)}
                    className="text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors"
                  >
                    View
                  </button>
                  <span className="text-gray-300">|</span>
                  <button 
                    onClick={() => handleDownloadReport(report.id)}
                    className="text-gray-600 hover:text-gray-700 text-xs font-medium transition-colors"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Upload New Report Section */}
      <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <svg className="w-8 h-8 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <h3 className="text-sm font-medium text-gray-900 mb-1">Upload New Report</h3>
        <p className="text-xs text-gray-500 mb-3">Drop files here or click to browse</p>
        <button className="medimitra-button-secondary px-4 py-2 rounded-lg text-sm font-medium">
          Choose Files
        </button>
      </div>
    </div>
  );
}