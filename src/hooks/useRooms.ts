//@ts-nocheck
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

export function useRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "rooms"), (snapshot) => {
      setRooms(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const createRoom = async (name, description) => {
    await addDoc(collection(db, "rooms"), {
      name,
      description,
      memberCount: 1,
      createdAt: new Date(),
    });
  };

  return { rooms, createRoom };
}
