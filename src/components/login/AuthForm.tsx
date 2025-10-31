"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PatientProfile from "@/app/patient/dashboard/page";
import DoctorDashboard from "@/app/doctor/dashboard/page";
import { auth, db } from "@/lib/firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface AuthFormProps {
  formType: "login" | "register";
  onFormTypeChange: (type: "login" | "register") => void;
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  isLoading: boolean;
  userType: "patient" | "doctor";
}

export default function AuthForm({
  formType,
  onFormTypeChange,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  showPassword,
  onTogglePassword,
  isLoading,
  userType,
}: AuthFormProps) {
  const router = useRouter();
  const [specialization, setSpecialization] = useState(""); // ✅ New state for doctor

  // ✅ Email/Password Handler (with Firestore)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formType === "login") {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // ✅ Save user info in Firestore
        const userData: any = {
          uid: user.uid,
          email: user.email,
          userType: userType,
          provider: "email",
          createdAt: new Date(),
        };

        // ✅ Add specialization if doctor
        if (userType === "doctor") {
          userData.specialization = specialization;
        }

        await setDoc(doc(db, "users", user.uid), userData);
        console.log("User registered and saved to Firestore!");
      }

      // ✅ Redirect based on userType
      if (userType === "patient") {
        router.push("/patient/profile");
      } else {
        router.push("/doctor/dashboard");
      }
    } catch (error: any) {
      console.error("Authentication Error:", error);
      alert(`Authentication failed: ${error.message}`);
    }
  };

  // ✅ Google Sign-In Handler (with Firestore)
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        const userData: any = {
          uid: user.uid,
          email: user.email,
          name: user.displayName || "Unnamed User",
          userType: userType,
          createdAt: new Date(),
          provider: "google",
        };

        // ✅ Add specialization if doctor
        if (userType === "doctor") {
          userData.specialization = specialization;
        }

        await setDoc(userRef, userData);
        console.log("Google user saved to Firestore!");
      } else {
        console.log("User already exists in Firestore.");
      }

      alert("Signed in with Google successfully!");

      // ✅ Redirect based on userType
      if (userType === "patient") {
        router.push("/patient/profile");
      } else {
        router.push("/doctor/dashboard");
      }
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      alert(`Google Sign-In failed: ${error.message}`);
    }
  };

  return (
    <div className="glass-card bg-white/10 rounded-2xl p-8 shadow-xl border border-white/20 backdrop-blur-sm">
      {/* Form Type Toggle */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => onFormTypeChange("login")}
          className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
            formType === "login"
              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
              : "bg-white/20 text-white hover:bg-white/10"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => onFormTypeChange("register")}
          className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
            formType === "register"
              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
              : "bg-white/20 text-white hover:bg-white/10"
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          type="email"
          label="Email"
          required
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder={
            userType === "patient"
              ? "you@example.com"
              : "doctor@hospital.com"
          }
        />

        <div className="space-y-2">
          <label className="block text-sm text-white">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-white/70 hover:text-white transition-colors duration-200"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* ✅ Show specialization field only for doctors */}
        {userType === "doctor" && formType === "register" && (
          <Input
            type="text"
            label="Specialization"
            required
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            placeholder="e.g. Cardiologist, Dermatologist"
          />
        )}

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full"
          size="lg"
        >
          {formType === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-grow h-px bg-white/20" />
        <span className="text-white/60 px-3 text-sm">or</span>
        <div className="flex-grow h-px bg-white/20" />
      </div>

      {/* ✅ Google Sign-In Button */}
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-medium py-3 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-200"
      >
        <Image
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google logo"
          width={20}
          height={20}
        />
        Sign in with Google
      </button>
    </div>
  );
}
