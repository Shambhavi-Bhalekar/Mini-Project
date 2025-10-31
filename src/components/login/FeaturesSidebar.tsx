"use client";

import React from "react";
import { Activity } from "lucide-react";
import FeatureCard from "./FeatureCard";
import TestimonialCard from "./TestimonialCard";
import { featuresData, testimonialsData } from "@/lib/loginData";

interface FeaturesSidebarProps {
  userType: "patient" | "doctor";
}

export default function FeaturesSidebar({ userType }: FeaturesSidebarProps) {
  const features = featuresData[userType];
  const testimonial = testimonialsData[userType];

  return (
    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-700/20 to-transparent pointer-events-none z-0"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8 animate-fade-in">
          <div className="bg-white/90 p-2 rounded-xl shadow-lg">
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-white ml-3">HealthCare</h1>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight animate-slide-up">
          {userType === "patient" ? (
            <>
              Your health journey{" "}
              <span className="text-yellow-200">starts here</span>
            </>
          ) : (
            <>
              Elevate your <span className="text-yellow-200">practice</span>
            </>
          )}
        </h2>

        {/* Subheading */}
        <p className="text-lg text-blue-50 mb-8 font-light animate-slide-up">
          {userType === "patient"
            ? "Personalized healthcare management that puts you in control of your wellbeing."
            : "Streamlined clinical workflow designed to enhance patient care and practice efficiency."}
        </p>

        {/* Features */}
        <div className="space-y-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>

        {/* Testimonial */}
        <TestimonialCard
          quote={testimonial.quote}
          name={testimonial.name}
          title={testimonial.title}
          userType={userType}
        />
      </div>
    </div>
  );
}