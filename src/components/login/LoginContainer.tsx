"use client";

import React, { useEffect } from "react";
import BackgroundBubbles from "./BackgroundBubbles";
import FeaturesSidebar from "./FeaturesSidebar";
import LoginForm from "./LoginForm";

interface LoginContainerProps {
  userType: "patient" | "doctor";
  onUserTypeChange: (type: "patient" | "doctor") => void;
  step: number;
  formType: "login" | "register";
  onFormTypeChange: (type: "login" | "register") => void;
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onContinue: () => void;
  isLoading: boolean;
}

export default function LoginContainer(props: LoginContainerProps) {
  useEffect(() => {
    const container = document.querySelector(".login-container");
    if (container) {
      container.classList.add("fade-in");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-700 flex items-center justify-center p-4 md:p-0 relative overflow-hidden">
      {/* Background Bubbles */}
      <BackgroundBubbles />

      {/* Main Container */}
      <div className="login-container w-full max-w-6xl bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row my-8 py-4 md:py-0 transition-all duration-700">
        {/* Left Side - Features */}
        <FeaturesSidebar userType={props.userType} />

        {/* Right Side - Login Form */}
        <LoginForm {...props} />
      </div>
    </div>
  );
}