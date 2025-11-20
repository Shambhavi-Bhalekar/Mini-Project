//@ts-nocheck
import React from 'react';

interface Props {
  fullName: string;
}

export default function Header({ fullName }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Welcome back, {fullName}!</h1>
      <p className="text-gray-600 mt-1">Here's your health summary for today.</p>
    </div>
  );
}