//@ts-nocheck
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "@/lib/firebase/firebase";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function usePatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "appointments"),
      where("patientId", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      const sorted = snap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => (a.date > b.date ? 1 : -1));

      setAppointments(sorted);
    });

    return () => unsub();
  }, [user]);

  return { appointments };
}
