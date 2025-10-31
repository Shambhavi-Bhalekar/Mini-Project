"use client";

import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number; // For staggered animations
}

export default function FeatureCard({ 
  icon, 
  title, 
  description, 
  index 
}: FeatureCardProps) {
  return (
    <div 
      className="flex items-start feature-card p-4 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2"
      style={{ 
        animationDelay: `${index * 200}ms` 
      }}
    >
      <div className="bg-blue-600 p-3 rounded-lg shadow-lg mr-4 text-white flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-white mb-1">
          {title}
        </h3>
        <p className="text-blue-100 font-light leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}