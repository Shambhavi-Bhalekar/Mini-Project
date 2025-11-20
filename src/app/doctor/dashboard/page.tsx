//@ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

import DoctorHeader from '@/components/Doctor-components/Dashboard/DoctorHeader';
import StatCard from '@/components/Doctor-components/Dashboard/StatCard';
import NotificationsPanel from '@/components/Doctor-components/Dashboard/NotificationsPanel';
import AppointmentsPreview from '@/components/Doctor-components/Dashboard/AppointmentsPreview';

import { Calendar, Users, Brain } from 'lucide-react';

export default function DoctorDashboard() {
  const [user] = useAuthState(auth);

  const [doctorInfo, setDoctorInfo] = useState(null);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [pendingReports, setPendingReports] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const todayDate = new Date().toISOString().split("T")[0];

  /* --------------------------------------------------------
     FETCH DOCTOR INFO
  ---------------------------------------------------------*/
  useEffect(() => {
    if (!user) return;

    const fetchInfo = async () => {
      const ref = doc(db, "doctors", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) setDoctorInfo(snap.data());
    };

    fetchInfo();
  }, [user]);


  /* --------------------------------------------------------
     FETCH TODAY'S APPOINTMENTS
  ---------------------------------------------------------*/
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "appointments"),
      where("doctorId", "==", user.uid),
      where("date", "==", todayDate),
      orderBy("time", "asc")
    );

    return onSnapshot(q, (snap) => {
      setTodayAppointments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [user, todayDate]);


  /* --------------------------------------------------------
     FETCH PENDING REPORTS
  ---------------------------------------------------------*/
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "reports"),
      where("doctorId", "==", user.uid),
      where("status", "==", "pending")
    );

    return onSnapshot(q, (snap) => {
      setPendingReports(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [user]);


  /* --------------------------------------------------------
     FETCH NOTIFICATIONS
  ---------------------------------------------------------*/
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notifications"),
      where("doctorId", "==", user.uid),
      orderBy("timestamp", "desc")
    );

    return onSnapshot(q, (snap) => {
      setNotifications(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [user]);


  if (!doctorInfo) {
    return <div className="text-center p-6 text-gray-500">Loading Doctor Dashboard...</div>;
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <DoctorHeader doctorInfo={doctorInfo} />

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Calendar />}
          label="Today's Appointments"
          value={todayAppointments.length}
          color="blue"
        />

        <StatCard
          icon={<Users />}
          label="Total Patients"
          value={doctorInfo.patientsCount}
          color="green"
        />

        
      </div>

      {/* NOTIFICATIONS */}
      <NotificationsPanel notifications={notifications} />

      {/* APPOINTMENTS */}
      <AppointmentsPreview appointments={todayAppointments} />
    </div>
  );
}
