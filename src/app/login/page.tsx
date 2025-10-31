"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoginContainer from "@/components/login/LoginContainer";
import "../../styles/globals.css";
import "../../styles/patient.css";

// ✅ Firebase imports (adjust path if needed)
import { auth } from "@/lib/firebase/firebase"; // <-- ensure this points to your firebase.ts file
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();

  const [userType, setUserType] = useState<"patient" | "doctor">("patient");
  const [formType, setFormType] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  // ✅ Firebase Auth handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formType === "login") {
        // --- Firebase Login ---
        await signInWithEmailAndPassword(auth, email, password);
        console.log("✅ User logged in successfully!");
      } else {
        // --- Firebase Registration ---
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("✅ User registered successfully!");
      }

      // Proceed to success screen
      setStep(2);
    } catch (error: any) {
      console.error("❌ Authentication Error:", error);
      alert(`Authentication failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Continue to dashboard
  const handleContinue = () => {
    setStep(3);
    setTimeout(() => {
      if (userType === "patient") {
        router.push("/patient/profile");
      } else {
        router.push("/doctor/dashboard");
      }
    }, 2000);
  };

  return (
    <LoginContainer
      userType={userType}
      onUserTypeChange={setUserType}
      step={step}
      formType={formType}
      onFormTypeChange={setFormType}
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      showPassword={showPassword}
      onTogglePassword={() => setShowPassword(!showPassword)}
      onSubmit={handleSubmit}
      onContinue={handleContinue}
      isLoading={isLoading}
    />
  );
}
