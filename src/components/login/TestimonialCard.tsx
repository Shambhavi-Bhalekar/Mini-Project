"use client";

import React from "react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  userType: "patient" | "doctor";
}

export default function TestimonialCard({ 
  quote, 
  name, 
  title, 
  userType 
}: TestimonialCardProps) {
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="hidden md:block mt-12 bg-blue-800/30 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-blue-800/40 transition-all duration-300">
      <p className="text-blue-50 italic font-light leading-relaxed mb-4">
        "{quote}"
      </p>
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mr-3 flex items-center justify-center text-white font-bold text-sm">
          {getInitials(name)}
        </div>
        <div>
          <p className="font-medium text-white">
            {name}
          </p>
          <p className="text-sm text-blue-200">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}