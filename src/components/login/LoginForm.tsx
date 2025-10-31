"use client";

import React from "react";
import UserTypeSelector from "./UserTypeSelector";
import AuthForm from "./AuthForm";
import SuccessScreen from "./SuccessScreen";
import LoadingScreen from "./LoadingScreen";

interface LoginFormProps {
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

export default function LoginForm({
  userType,
  onUserTypeChange,
  step,
  formType,
  onFormTypeChange,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  showPassword,
  onTogglePassword,
  onSubmit,
  onContinue,
  isLoading
}: LoginFormProps) {
  return (
    <div className="md:w-1/2 bg-white/10 backdrop-blur-md p-8 md:p-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Step 1: Form */}
        {step === 1 && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome
              </h2>
              <p className="text-blue-100 mb-6">
                Sign in to access your dashboard
              </p>

              {/* User Type Selector */}
              <UserTypeSelector
                userType={userType}
                onUserTypeChange={onUserTypeChange}
              />
            </div>

            {/* Auth Form */}
            <AuthForm
              formType={formType}
              onFormTypeChange={onFormTypeChange}
              email={email}
              password={password}
              onEmailChange={onEmailChange}
              onPasswordChange={onPasswordChange}
              showPassword={showPassword}
              onTogglePassword={onTogglePassword}
              onSubmit={onSubmit}
              isLoading={isLoading}
              userType={userType}
            />
          </>
        )}

        {/* Step 2: Success */}
        {step === 2 && (
          <SuccessScreen
            formType={formType}
            userType={userType}
            onContinue={onContinue}
          />
        )}

        {/* Step 3: Loader */}
        {step === 3 && (
          <LoadingScreen userType={userType} />
        )}
      </div>
    </div>
  );
}