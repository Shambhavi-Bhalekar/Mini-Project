//@ts-nocheck
'use client';
import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '@/lib/firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Save } from 'lucide-react';

import Header from '@/components/Doctor-components/Header';
import PersonalInformation from '@/components/Doctor-components/PersonalInformation';
import ProfessionalInformation from '@/components/Doctor-components/ProfessionalInformation';
import WorkDetails from '@/components/Doctor-components/WorkDetails';
import CertificatesSection from '@/components/Doctor-components/CertificatesSection';
import AchievementsSection from '@/components/Doctor-components/AchievementsSection';
import ScheduleSummary from '@/components/Doctor-components/ScheduleSummary';

export default function DoctorDetailsPage() {
  const [saveMessage, setSaveMessage] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [doctorData, setDoctorData] = useState({
    name: '',
    specialization: '',
    secondarySpecialization: '',
    licenseNumber: '',
    phone: '',
    email: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    experience: '',
    education: '',
    languages: '',
    about: '',
  });

  const [workDetails, setWorkDetails] = useState({
    hospitalName: '',
    hospitalAddress: '',
    department: '',
    position: '',
    workingDays: [],
    morningStartTime: '',
    morningEndTime: '',
    eveningStartTime: '',
    eveningEndTime: '',
    consultationFee: '',
    emergencyAvailable: false,
  });

  const [certificates, setCertificates] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchDoctorData(currentUser.uid);
      } else {
        setUser(null);
        setSaveMessage('Please log in to view your profile.');
        setTimeout(() => setSaveMessage(''), 3000);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchDoctorData = async (uid) => {
    try {
      setLoading(true);
      const docRef = doc(db, 'doctors', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setDoctorData(data.personalInfo || {});
        setWorkDetails(data.workDetails || {});
        setCertificates(data.certificates || []);
        setAchievements(data.achievements || []);
      } else {
        console.log('No existing doctor data found.');
      }
    } catch (error) {
      console.error('Error fetching doctor data:', error);
      setSaveMessage('❌ Error fetching data.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const savePersonalInfo = async () => {
    await saveSection('personalInfo', doctorData, 'Personal Information saved!');
  };

  const saveProfessionalInfo = async () => {
    await saveSection('personalInfo', { ...doctorData }, 'Professional Information saved!');
  };

  const saveWorkDetails = async () => {
    await saveSection('workDetails', workDetails, 'Work Details saved!');
  };

  const saveCertificates = async () => {
    await saveSection('certificates', certificates, 'Certificates saved!');
  };

  const saveAchievements = async () => {
    await saveSection('achievements', achievements, 'Achievements saved!');
  };

  const saveSection = async (key, data, successMessage) => {
    if (!user) {
      setSaveMessage('⚠️ Please log in first.');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    try {
      const docRef = doc(db, 'doctors', user.uid);
      await setDoc(
      docRef,
      {
        uid: user.uid, // ← ensures doctor UID is stored in their doc
        [key]: data,
        lastUpdated: new Date().toISOString(),
      },
      { merge: true }
    );
      setSaveMessage(`✅ ${successMessage}`);
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      setSaveMessage(`❌ Failed to save ${key}.`);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };
  const handleFileUpload = async (event, type) => {
    if (!user) {
      setSaveMessage('⚠️ Please log in to upload certificates.');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    const file = event.target.files[0];
    if (!file) return;

    try {
      const storageRef = ref(storage, `certificates/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const newCertificate = {
        id: certificates.length + 1,
        name: file.name,
        type,
        issueDate: new Date().toISOString().split('T')[0],
        issuedBy: 'To be verified',
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        verified: false,
        url: downloadURL,
      };

      const updatedCertificates = [newCertificate, ...certificates];
      setCertificates(updatedCertificates);
      await saveSection('certificates', updatedCertificates, 'Certificate uploaded!');
    } catch (error) {
      console.error('Upload error:', error);
      setSaveMessage('❌ Error uploading certificate.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {saveMessage && (
        <div className="fixed top-20 right-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {saveMessage}
        </div>
      )}

      <Header doctorData={doctorData} />

      <PersonalInformation doctorData={doctorData} setDoctorData={setDoctorData} isEditing={true}/>
      <div className="flex justify-end mb-4">
        <button
          onClick={savePersonalInfo}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Save className="mr-2 w-5 h-5" /> Save Personal Info
        </button>
      </div>

      <ProfessionalInformation doctorData={doctorData} setDoctorData={setDoctorData} isEditing={true}/>
      <div className="flex justify-end mb-4">
        <button
          onClick={saveProfessionalInfo}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Save className="mr-2 w-5 h-5" /> Save Professional Info
        </button>
      </div>

      <WorkDetails workDetails={workDetails} setWorkDetails={setWorkDetails} isEditing={true}/>
      <div className="flex justify-end mb-4">
        <button
          onClick={saveWorkDetails}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Save className="mr-2 w-5 h-5" /> Save Work Details
        </button>
      </div>

      <CertificatesSection
        certificates={certificates}
        setCertificates={setCertificates}
        handleFileUpload={handleFileUpload}
        isEditing={true}
      />
      <div className="flex justify-end mb-4">
        <button
          onClick={saveCertificates}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Save className="mr-2 w-5 h-5" /> Save Certificates
        </button>
      </div>

      <AchievementsSection achievements={achievements} setAchievements={setAchievements} isEditing={true}/>
      <div className="flex justify-end mb-4">
        <button
          onClick={saveAchievements}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Save className="mr-2 w-5 h-5" /> Save Achievements
        </button>
      </div>

      <ScheduleSummary workDetails={workDetails} isEditing={true} />
    </div>
  );
}
