//@ts-nocheck
'use client';
import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import PersonalInfoForm from '@/components/patient/PersonalInfoForm';
import AllergiesSection from '@/components/patient/AllergiesSection';
import DailyDosagesSection from '@/components/patient/DailyDosagesSection';
import PrescriptionsSection from '@/components/patient/PrescriptionsSection';
import PrescriptionUploadModal from '@/components/patient/PrescriptionUploadModal';
import { auth, db } from "@/lib/firebase/firebase";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function PatientDetailsPage() {
  const [user, setUser] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    allergies: [''],
    dailyDosages: [{ medication: '', dosage: '', frequency: '', time: '' }],
  });

  const [age, setAge] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 🔹 Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchPatientData(user.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Fetch patient data from Firestore
  const fetchPatientData = async (uid) => {
    try {
      const docRef = doc(db, "patients", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPatientData(data);
        if (data.prescriptions) setPrescriptions(data.prescriptions);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  // 🔹 Calculate Age
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

  // 🔹 Save all patient data
  const saveData = async () => {
    if (!user) {
      setSaveMessage("⚠️ Please log in to save your data.");
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    // Clean out File objects before saving
    const cleanPrescriptions = prescriptions.map(p => {
      const cleaned = { ...p };
      for (const key in cleaned) {
        if (cleaned[key] instanceof File) delete cleaned[key];
      }
      return cleaned;
    });

    const dataToSave = {
      ...patientData,
      prescriptions: cleanPrescriptions,
      uid: user.uid,
      email: user.email,
    };

    try {
      const docRef = doc(db, "patients", user.uid);
      await setDoc(docRef, dataToSave, { merge: true });
      console.log("✅ Saved successfully:", dataToSave);
      setSaveMessage('✅ Patient data saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error("❌ Error saving data:", error);
      let errorMessage = "❌ Error saving data. Check console for details.";
      if (error.code === 'permission-denied') {
        errorMessage = "❌ Save failed: Permission Denied. Check Firestore Security Rules.";
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
              <PersonalInfoForm patientData={patientData} setPatientData={setPatientData} age={age} />
              <AllergiesSection patientData={patientData} setPatientData={setPatientData} />
              <DailyDosagesSection patientData={patientData} setPatientData={setPatientData} />
              <PrescriptionsSection
                prescriptions={prescriptions}
                setPrescriptions={setPrescriptions}
                setShowModal={setShowModal}
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

      {showModal && (
        <PrescriptionUploadModal
          user={user}
          prescriptions={prescriptions}
          setPrescriptions={setPrescriptions}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
