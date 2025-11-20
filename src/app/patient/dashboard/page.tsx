//@ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';

// Components
import ProfileHeader from '@/components/patient/dashboard/ProfileHeader';
import TabNavigation from '@/components/patient/dashboard/TabNavigation';
import OverviewTab from '@/components/patient/dashboard/OverviewTab';
import ReportsTab from '@/components/patient/dashboard/ReportsTab';
import AllergiesTab from '@/components/patient/dashboard/AllergiesTab';

export default function PatientProfile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  const [user] = useAuthState(auth);

  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    bloodGroup: '',
    phoneNumber: '',
    email: '',
    address: '',
    emergencyContact: '',
    dateOfBirth: '',
    allergies: [],
    reports: [],
  });

  // Fetch patient data
  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const snap = await getDoc(doc(db, 'patients', user.uid));
        if (snap.exists()) {
          const data = snap.data();
          setPatientData({ ...patientData, ...data, email: user.email });
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  // Calculate Age
  const age = (() => {
    if (!patientData.dateOfBirth) return '';
    const dob = new Date(patientData.dateOfBirth);
    const today = new Date();
    let years = today.getFullYear() - dob.getFullYear();
    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
      years--;
    }
    return years;
  })();

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="space-y-6 animate-fade-in">

      <ProfileHeader />

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="p-6">
          {activeTab === 'overview' && <OverviewTab patientData={patientData} age={age} />}
          {/* {activeTab === 'medical' && <MedicalHistoryTab medicalHistory={patientData.medicalHistory} />} */}
          {activeTab === 'reports' && <ReportsTab reports={patientData.reports} />}
          {activeTab === 'allergies' && <AllergiesTab allergies={patientData.allergies} />}
        </div>
      </div>

    </div>
  );
}
