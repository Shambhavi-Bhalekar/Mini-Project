//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "appointments"),
      where("patientId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    // Real-time updates instead of one-time fetch
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) return <p className="p-6 text-gray-600">Loading your appointments...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500">You haven't booked any appointments yet.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((app) => (
            <div
              key={app.id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <p className="text-lg font-semibold">Dr. {app.doctorName}</p>
              <p className="text-gray-600">
                📅 {app.date} &nbsp; ⏰ {app.time}
              </p>
              <p
                className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  app.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : app.status === "confirmed"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
