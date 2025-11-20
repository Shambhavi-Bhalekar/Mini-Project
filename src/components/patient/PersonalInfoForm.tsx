//@ts-nocheck
"use client";
import React from "react";

export default function PersonalInfoForm({ patientData, setPatientData, age }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* First Name & Last Name */}
      {["firstName", "lastName"].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            {field === "firstName" ? "First Name" : "Last Name"}
          </label>
          <input
            type="text"
            name={field}
            value={patientData[field]}
            onChange={handleChange}
            className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      {/* Date of Birth */}
      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Date of Birth
        </label>
        <input
          type="date"
          name="dateOfBirth"
          value={patientData.dateOfBirth}
          onChange={handleChange}
          className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Age */}
      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Age
        </label>
        <input
          type="text"
          value={age}
          readOnly
          className="w-full p-2 bg-gray-100 border border-blue-200 rounded"
        />
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Gender
        </label>
        <select
          name="gender"
          value={patientData.gender}
          onChange={handleChange}
          className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </div>

      {/* Height & Weight */}
      {["height", "weight"].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            {field === "height" ? "Height (cm)" : "Weight (kg)"}
          </label>
          <input
            type="number"
            name={field}
            value={patientData[field]}
            onChange={handleChange}
            className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Phone Number
        </label>
        <input
          type="text"
          name="phoneNumber"
          value={patientData.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Enter phone number"
        />
      </div>

      {/* Emergency Contact */}
      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Emergency Contact
        </label>
        <input
          type="text"
          name="emergencyContact"
          value={patientData.emergencyContact || ""}
          onChange={handleChange}
          className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Emergency contact number"
        />
      </div>

      {/* Address */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Address
        </label>
        <input
          type="text"
          name="address"
          value={patientData.address}
          onChange={handleChange}
          className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Enter full address"
        />
      </div>

      {/* Blood Group */}
      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Blood Group
        </label>
        <select
          name="bloodGroup"
          value={patientData.bloodGroup}
          onChange={handleChange}
          className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>
    </div>
  );
}
