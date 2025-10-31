//@ts-nocheck
"use client";
import React from 'react';
import { Edit, Save, X } from 'lucide-react';

export default function Header({ doctorData, isEditing, setIsEditing, setSaveMessage }) {
  

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-2xl font-medium text-blue-600">
            {doctorData.name.split(' ').filter(n => n.startsWith('Dr.') === false).map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{doctorData.name}</h1>
          <p className="text-gray-500">{doctorData.specialization}</p>
          <p className="text-sm text-gray-400">License: {doctorData.licenseNumber}</p>
        </div>
      </div>
      
    </div>
  );
}
