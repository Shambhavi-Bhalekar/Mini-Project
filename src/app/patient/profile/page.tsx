// app/patient/details/page.tsx
//@ts-nocheck
'use client';
import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import PersonalInfoForm from '@/components/patient/PersonalInfoForm';
import AllergiesSection from '@/components/patient/AllergiesSection';
import DailyDosagesSection from '@/components/patient/DailyDosagesSection';
import PrescriptionsSection from '@/components/patient/PrescriptionsSection';
import PrescriptionUploadModal from '@/components/patient/PrescriptionUploadModal';

// NEW reports components
import ReportsSection from '@/components/patient/ReportsSection';
import ReportUploadModal from '@/components/patient/ReportUploadModal';

import { auth, db } from "@/lib/firebase/firebase";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function PatientDetailsPage() {
  const [user, setUser] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');

  // patientData includes fields we've expanded
  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    phoneNumber: '',
    address: '',
    bloodGroup: '',
    gender: '',
    emergencyContact: '',
    allergies: [''],
    dailyDosages: [{ medication: '', dosage: '', frequency: '', time: '' }],
  });

  const [age, setAge] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);
  const [reports, setReports] = useState([]); // NEW
  const [showModal, setShowModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false); // NEW

  // 🔹 Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        fetchPatientData(u.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Fetch Patient Data
  const fetchPatientData = async (uid) => {
    try {
      const docRef = doc(db, "patients", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setPatientData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          dateOfBirth: data.dateOfBirth || '',
          height: data.height || '',
          weight: data.weight || '',
          phoneNumber: data.phoneNumber || '',
          address: data.address || '',
          bloodGroup: data.bloodGroup || '',
          gender: data.gender || '',
          emergencyContact: data.emergencyContact || '',
          allergies: data.allergies || [''],
          dailyDosages: data.dailyDosages || [{ medication: '', dosage: '', frequency: '', time: '' }],
        });

        if (data.prescriptions) setPrescriptions(data.prescriptions);
        if (data.reports) setReports(data.reports);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  // 🔹 Auto Calculate Age
  useEffect(() => {
    if (patientData.dateOfBirth) {
      const birthDate = new Date(patientData.dateOfBirth);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge.toString());
    } else {
      setAge('');
    }
  }, [patientData.dateOfBirth]);

  // 🔹 Save Data (includes reports)
  const saveData = async () => {
    if (!user) {
      setSaveMessage("⚠️ Please log in to save your data.");
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    // Clean File objects out of prescriptions & reports before saving (Firestore cannot store File objects)
    const cleanPrescriptions = prescriptions.map((p) => {
      const cleaned = { ...p };
      for (const key in cleaned) {
        if (cleaned[key] instanceof File) delete cleaned[key];
      }
      return cleaned;
    });

    // For reports, the ReportUploadModal stores temporary objects with a `file` prop.
    // We remove the file object and save only metadata here (name, date, type, status).
    const cleanReports = reports.map((r) => {
      const { file, ...meta } = r;
      return meta;
    });

    const dataToSave = {
      ...patientData,
      prescriptions: cleanPrescriptions,
      reports: cleanReports,
      uid: user.uid,
      email: user.email,
    };

    try {
      const docRef = doc(db, "patients", user.uid);
      await setDoc(docRef, dataToSave, { merge: true });

      setSaveMessage('✅ Patient data saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error(" Error saving data:", error);

      let errorMessage = " Error saving data. Check console for details.";
      if (error.code === 'permission-denied') {
        errorMessage = " Save failed: Permission Denied. Check Firestore Security Rules.";
      }

      setSaveMessage(errorMessage);
      setTimeout(() => setSaveMessage(''), 5000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-blue-50 text-gray-700">

      {/* Toast Message */}
      {saveMessage && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-xl text-white 
          ${saveMessage.startsWith('✅') ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {saveMessage}
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="p-8 w-full max-w-10xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full">
            <h1 className="text-3xl font-bold text-blue-800 mb-8">Patient Information</h1>

            <div className="space-y-10">
              <PersonalInfoForm
                patientData={patientData}
                setPatientData={setPatientData}
                age={age}
              />

              <AllergiesSection
                patientData={patientData}
                setPatientData={setPatientData}
              />

              <DailyDosagesSection
                patientData={patientData}
                setPatientData={setPatientData}
              />

              <PrescriptionsSection
                prescriptions={prescriptions}
                setPrescriptions={setPrescriptions}
                setShowModal={setShowModal}
              />

              {/* Reports Section (NEW) */}
              <ReportsSection
                reports={reports}
                setShowReportModal={setShowReportModal}
              />
            </div>

            <div className="flex justify-end mt-10">
              <button
                onClick={saveData}
                className="flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Save size={22} className="mr-2" />
                Save Information
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <PrescriptionUploadModal
          user={user}
          prescriptions={prescriptions}
          setPrescriptions={setPrescriptions}
          setShowModal={setShowModal}
        />
      )}

      {showReportModal && (
        <ReportUploadModal
          reports={reports}
          setReports={setReports}
          setShowReportModal={setShowReportModal}
          onSave={() => {
          }}
        />
      )}
    </div>
  );
}
