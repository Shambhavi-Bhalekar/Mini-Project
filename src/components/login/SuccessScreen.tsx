"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

interface SuccessScreenProps {
  formType: "login" | "register";
  userType: "patient" | "doctor";
  onContinue: () => void;
}

export default function SuccessScreen({ 
  formType, 
  userType, 
  onContinue 
}: SuccessScreenProps) {
  return (
    <div className="text-center text-white animate-fade-in">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">
          {formType === "login" ? "Login Successful!" : "Account Created!"}
        </h2>
        <p className="mb-6 text-blue-100">
          {userType === "patient"
            ? "Redirecting to your health dashboard..."
            : "Redirecting to your clinical console..."}
        </p>
      </div>
      
      <Button
        onClick={onContinue}
        variant="primary"
        size="lg"
        className="inline-flex items-center"
      >
        Continue 
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}