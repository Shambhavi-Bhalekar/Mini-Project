//@ts-nocheck
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/firebase";
import {collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  increment,
} from "firebase/firestore";

export function useMessages(roomId, user) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!roomId) return;
    const q = query(collection(db, "rooms", roomId, "messages"), orderBy("timestamp"));
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [roomId]);

  const sendMessage = async (messageData) => {
    const { text, title, isPost, roomId } = messageData;
    if (!text?.trim() || !roomId || !user) return;

    await addDoc(collection(db, "rooms", roomId, "messages"), {
      type: isPost ? "post" : "message",
      text,
      title: isPost ? title : null,
      authorName: messageData.authorName || user.displayName || "Anonymous",
      authorAvatar: user.photoURL || "",
      authorId: user.uid,
      timestamp: messageData.timestamp || new Date(),
      likes: 0,
      likedBy: [],
    });
  };

  const toggleLike = async (messageId, likedByUser) => {
    if (!roomId || !user) return;
    const ref = doc(db, "rooms", roomId, "messages", messageId);
    await updateDoc(ref, {
      likes: likedByUser ? increment(-1) : increment(1),
      likedBy: likedByUser ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });
  };

  return { messages, sendMessage, toggleLike };
}
