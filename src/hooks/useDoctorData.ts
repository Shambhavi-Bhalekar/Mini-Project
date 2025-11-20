//@ts-nocheck
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export default function useDoctorData() {
  const [doctors, setDoctors] = useState([]);
  const [recentDoctors, setRecentDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const snapshot = await getDocs(collection(db, "doctors"));
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setDoctors(list);
        setRecentDoctors(list.slice(0, 3));
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetch();
  }, []);

  return { doctors, recentDoctors, loadingDoctors };
}
