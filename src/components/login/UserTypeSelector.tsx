"use client";

import React from "react";
import { User, Stethoscope } from "lucide-react";

interface UserTypeSelectorProps {
  userType: "patient" | "doctor";
  onUserTypeChange: (type: "patient" | "doctor") => void;
}

export default function UserTypeSelector({ 
  userType, 
  onUserTypeChange 
}: UserTypeSelectorProps) {
  return (
    <div className="bg-white/10 rounded-xl p-2 inline-flex shadow-lg mb-4">
      <button
        onClick={() => onUserTypeChange("patient")}
        className={`flex items-center py-2 px-4 rounded-lg transition-all duration-200 ${
          userType === "patient"
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
            : "text-white hover:bg-white/10"
        }`}
      >
        <User className="h-4 w-4 mr-2" />
        Patient
      </button>
      <button
        onClick={() => onUserTypeChange("doctor")}
        className={`flex items-center py-2 px-4 rounded-lg transition-all duration-200 ${
          userType === "doctor"
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
            : "text-white hover:bg-white/10"
        }`}
      >
        <Stethoscope className="h-4 w-4 mr-2" />
        Doctor
      </button>
    </div>
  );
}