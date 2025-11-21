//@ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";

import { auth, db } from "@/lib/firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import PersonalInfoForm from "@/components/patient/PersonalInfoForm";
import AllergiesSection from "@/components/patient/AllergiesSection";
import DailyDosagesSection from "@/components/patient/DailyDosagesSection";
import PrescriptionsSection from "@/components/patient/PrescriptionsSection";
import PrescriptionUploadModal from "@/components/patient/PrescriptionUploadModal";

import ReportsSection from "@/components/patient/ReportsSection";
import ReportUploadModal from "@/components/patient/ReportUploadModal";

export default function PatientDetailsPage() {
  const [user, setUser] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");

  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    phoneNumber: "",
    address: "",
    bloodGroup: "",
    gender: "",
    emergencyContact: "",
    allergies: [""],
    dailyDosages: [{ medication: "", dosage: "", frequency: "", time: "" }],
  });

  // Prescription & report URLs (from Appwrite)
  const [prescriptions, setPrescriptions] = useState([]);
  const [reports, setReports] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // Load authenticated user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        fetchPatientData(u.uid);
      }
    });
    return () => unsub();
  }, []);

  // Fetch Firestore data
  const fetchPatientData = async (uid) => {
    const ref = doc(db, "patients", uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();

      setPatientData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        dateOfBirth: data.dateOfBirth || "",
        height: data.height || "",
        weight: data.weight || "",
        phoneNumber: data.phoneNumber || "",
        address: data.address || "",
        bloodGroup: data.bloodGroup || "",
        gender: data.gender || "",
        emergencyContact: data.emergencyContact || "",
        allergies: data.allergies || [""],
        dailyDosages:
          data.dailyDosages || [{ medication: "", dosage: "", frequency: "", time: "" }],
      });

      setPrescriptions(data.prescriptions || []);
      setReports(data.reports || []);
    }
  };

  // Save Data to Firestore
  const saveData = async () => {
    if (!user) return;

    const dataToSave = {
      ...patientData,
      prescriptions, // Appwrite URLs already stored
      reports, // Appwrite URLs already stored
      uid: user.uid,
      email: user.email,
    };

    try {
      await setDoc(doc(db, "patients", user.uid), dataToSave, { merge: true });
      setSaveMessage("Saved!");
    } catch (e) {
      console.error("Save error", e);
      setSaveMessage("Error saving data");
    }

    setTimeout(() => setSaveMessage(""), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-blue-50 text-gray-700">
      {/* Toast */}
      {saveMessage && (
        <div className="fixed top-4 right-4 px-6 py-3 bg-green-600 text-white rounded shadow">
          {saveMessage}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="bg-white p-8 rounded shadow">
            <h1 className="text-3xl font-bold text-blue-800 mb-8">Patient Information</h1>

            <PersonalInfoForm patientData={patientData} setPatientData={setPatientData} />

            <AllergiesSection patientData={patientData} setPatientData={setPatientData} />

            <DailyDosagesSection patientData={patientData} setPatientData={setPatientData} />

            {/* PRESCRIPTIONS */}
            <PrescriptionsSection
              prescriptions={prescriptions}
              setShowModal={setShowModal}
            />

            {/* REPORTS */}
            <ReportsSection reports={reports} setShowReportModal={setShowReportModal} />

            <div className="flex justify-end mt-10">
              <button
                onClick={saveData}
                className="flex items-center bg-blue-600 text-white px-8 py-4 rounded"
              >
                <Save className="mr-2" /> Save Information
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Prescription Modal */}
      {showModal && (
        <PrescriptionUploadModal
          prescriptions={prescriptions}
          setPrescriptions={setPrescriptions}
          setShowModal={setShowModal}
          saveData={saveData}
        />
      )}

      {/* Report Modal */}
      {showReportModal && (
        <ReportUploadModal
          reports={reports}
          setReports={setReports}
          setShowReportModal={setShowReportModal}
          onSave={saveData}
        />
      )}
    </div>
  );
}
