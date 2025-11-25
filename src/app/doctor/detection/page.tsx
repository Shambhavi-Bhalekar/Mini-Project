"use client";

import { useState, useRef } from "react";
import { Upload, Brain, Activity, Loader2, RefreshCw } from "lucide-react";

export default function DetectionPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  // Handle Image Selection
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
      setResults(null);
      setError(null);
    }
  };

  // Handle Prediction API call
  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const form = new FormData();
      form.append("file", selectedFile);

      // Next.js API route
      const res = await fetch("/api/predict", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        throw new Error("Failed to process MRI. Backend is not responding.");
      }

      const data = await res.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset all
  const resetAll = () => {
    setSelectedFile(null);
    setSelectedImage(null);
    setResults(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Brain Tumor Segmentation</h1>
          </div>
          <p className="text-gray-600 mt-1">
            Upload an MRI scan to visualize AI-generated tumor segmentation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Upload Box */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" />
              Upload MRI Scan
            </h2>

            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50 hover:border-blue-400 transition cursor-pointer"
              onClick={() => fileRef.current?.click()}
            >
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                onChange={handleSelect}
                className="hidden"
              />

              {!selectedImage ? (
                <div className="space-y-4 py-6">
                  <Upload className="w-16 h-16 mx-auto text-gray-400" />
                  <p className="font-medium text-gray-700">Click to upload</p>
                  <p className="text-sm text-gray-500">PNG, JPG, JPEG</p>
                </div>
              ) : (
                <div>
                  <img
                    src={selectedImage}
                    alt="Selected MRI"
                    className="max-h-72 mx-auto rounded-lg shadow"
                  />
                  <p className="text-gray-500 text-sm mt-2">Click to change image</p>
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={handleAnalyze}
                disabled={!selectedFile || loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <Activity className="w-5 h-5" />
                    Analyze
                  </>
                )}
              </button>

              {selectedFile && (
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 rounded-xl flex items-center gap-2"
                  onClick={resetAll}
                >
                  <RefreshCw className="w-4 h-4" /> Reset
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              Segmentation Result
            </h2>

            {!results && !error && !loading && (
              <div className="text-center text-gray-400 py-28">
                <Brain className="w-16 h-16 mx-auto opacity-50 mb-3" />
                <p>Upload an MRI and click Analyze</p>
              </div>
            )}

            {loading && (
              <div className="text-center py-28">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Processing MRI scan…</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-xl">
                {error}
              </div>
            )}

            {results && (
              <div className="space-y-6">

                <div>
                  <p className="text-gray-600 mb-2">Original MRI</p>
                  <img
                    src={results.before}
                    alt="Original MRI"
                    className="rounded-xl shadow max-h-96 w-full object-contain"
                  />
                </div>

                <div>
                  <p className="text-gray-600 mb-2">Segmentation Overlay</p>
                  <img
                    src={results.after}
                    alt="Segmentation Overlay"
                    className="rounded-xl shadow max-h-96 w-full object-contain"
                  />
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
