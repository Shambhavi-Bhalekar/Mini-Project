"use client";

import React from "react";

interface LoadingScreenProps {
  userType: "patient" | "doctor";
}

export default function LoadingScreen({ userType }: LoadingScreenProps) {
  return (
    <div className="text-center text-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <p className="animate-pulse text-lg">
          {userType === "patient"
            ? "Redirecting to your dashboard..."
            : "Redirecting to your console..."}
        </p>
      </div>
    </div>
  );
}