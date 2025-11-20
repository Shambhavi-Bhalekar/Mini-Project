//@ts-nocheck
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '@/lib/firebase/firebase';
import { collection, query, where, onSnapshot, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

export default function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('today');
  const [activeTab, setActiveTab] = useState('appointments');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [user] = useAuthState(auth);

  // Fetch appointments
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'appointments'),
      where('doctorId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const appts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      appts.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA.getTime() - dateB.getTime();
      });

      setAppointments(appts);
    });

    return () => unsubscribe();
  }, [user]);

  // Change status
  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await updateDoc(doc(db, 'appointments', appointmentId), {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });

      toast.success(`Appointment marked as ${newStatus}`);
      setSelectedAppointment(null);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  // Age calculation
  const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Filtering logic
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const weekStr = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

  const filtered = appointments.filter((appt) => {
    const matchesStatus = filterStatus === 'all' || appt.status === filterStatus;

    const matchesSearch =
      appt.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.token?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.date.includes(searchTerm);

    let matchesDate = true;
    if (filterDate === 'today') matchesDate = appt.date === todayStr;
    else if (filterDate === 'tomorrow') matchesDate = appt.date === tomorrowStr;
    else if (filterDate === 'week') matchesDate = appt.date >= todayStr && appt.date <= weekStr;

    return matchesStatus && matchesSearch && matchesDate;
  });

  const displayedAppointments =
    activeTab === 'appointments'
      ? filtered.filter(a => a.status !== 'completed')
      : filtered.filter(a => a.status === 'completed');

  return {
    appointments,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterDate,
    setFilterDate,
    activeTab,
    setActiveTab,
    selectedAppointment,
    setSelectedAppointment,
    displayedAppointments,
    handleStatusChange,
    calculateAge
  };
}
