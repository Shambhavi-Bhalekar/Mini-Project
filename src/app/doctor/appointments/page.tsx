//@ts-nocheck
'use client';
import { useState, useEffect, use } from 'react';
import {
  Calendar, Clock, CheckCircle, X, Users, Filter,
  Search, Phone, Mail
} from 'lucide-react';
import {
  collection, query, where, orderBy, onSnapshot,
  updateDoc, doc, serverTimestamp
} from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';

interface Appointment {
  id: string;
  token?: string;
  patientName: string;
  patientdob: string;
  patientPhone: string;
  patientEmail: string;
  date: string;
  time: string;
  status: 'queued' | 'confirmed' | 'completed' | 'cancelled';
  condition?: string;
  consultationFee: string;
  createdAt?: any;
}

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [activeTab, setActiveTab] = useState<'appointments' | 'history'>('appointments');

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'appointments'),
      where('doctorId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const appts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Appointment[];

      // ✅ Sort appointments by date and time in ascending order
      appts.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA.getTime() - dateB.getTime();
      });

      setAppointments(appts);
    });

    return () => unsubscribe();
  }, [user]);

  const handleStatusChange = async (appointmentId: string, newStatus: Appointment['status']) => {
    try {
      await updateDoc(doc(db, 'appointments', appointmentId), {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });

      toast.success(`Appointment marked as ${newStatus}`);
      setSelectedAppointment(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update status');
    }
  };

  const calculateAge = (dob: string) => {
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


  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const weekFromNow = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

  const filteredAppointments = appointments.filter((appt) => {
    const matchesStatus = filterStatus === 'all' || appt.status === filterStatus;
    const matchesSearch =
      appt.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.token?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.date.includes(searchTerm);

    let matchesDate = true;
    if (filterDate === 'today') matchesDate = appt.date === today;
    else if (filterDate === 'tomorrow') matchesDate = appt.date === tomorrow;
    else if (filterDate === 'week') matchesDate = appt.date >= today && appt.date <= weekFromNow;

    return matchesStatus && matchesSearch && matchesDate;
  });

  const currentAppointments = filteredAppointments.filter((a) => a.status !== 'completed');
  const historyAppointments = filteredAppointments.filter((a) => a.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'queued':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const displayedAppointments =
    activeTab === 'appointments' ? currentAppointments : historyAppointments;

    const [age, setAge] = useState<string>('');
  useEffect(() => {
  if (selectedAppointment?.patientdob) {
    const birthDate = new Date(selectedAppointment.patientdob);
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
}, [selectedAppointment?.patientdob]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center space-x-3 text-gray-900">
            <Calendar className="w-8 h-8 text-blue-500" />
            <span>Appointments Dashboard</span>
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${activeTab === 'appointments'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Current
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${activeTab === 'history'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              History
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[250px] relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name, date or token..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="week">This Week</option>
            <option value="all">All Dates</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="queued">Queued</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Appointment List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Filter className="w-5 h-5 mr-2 text-blue-500" />
            {activeTab === 'appointments' ? 'Current Appointments' : 'History'} ({displayedAppointments.length})
          </h2>

          {displayedAppointments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No appointments found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayedAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                  onClick={() => setSelectedAppointment(appt)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {appt.patientName.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {appt.patientName} ({calculateAge(appt.patientdob)}  yrs)
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(appt.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}{' '}
                          at {appt.time}
                        </p>
                      </div>
                    </div>

                    {appt.status !== 'completed' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(appt.id, 'completed');
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Mark Done</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Appointment Detail Modal */}
        {selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
                <button onClick={() => setSelectedAppointment(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {selectedAppointment.patientName} ({calculateAge(selectedAppointment.patientdob)} yrs)
                  </h3>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><Phone className="w-4 h-4 inline mr-1 text-blue-500" /> {selectedAppointment.patientPhone}</p>
                    <p><Mail className="w-4 h-4 inline mr-1 text-blue-500" /> {selectedAppointment.patientEmail}</p>
                    <p><Calendar className="w-4 h-4 inline mr-1 text-blue-500" /> {selectedAppointment.date}</p>
                    <p><Clock className="w-4 h-4 inline mr-1 text-blue-500" /> {selectedAppointment.time}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 border-t border-gray-200 pt-4">
                  {selectedAppointment.status !== 'completed' && (
                    <button
                      onClick={() => handleStatusChange(selectedAppointment.id, 'completed')}
                      className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 flex items-center space-x-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Mark Done</span>
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
