//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { useRooms } from "@/hooks/useRooms";
import { useMessages } from "@/hooks/useMessages";
import Navbar from "@/components/patient/Navbar";
import ChatWindow from "@/components/patient/ChatWindow";
import MessageInput from "@/components/patient/MessageInput";
import CreateRoomModal from "@/components/patient/CreateRoomModal";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export default function CommunityPlatform() {
  const [currentRoom, setCurrentRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");

  const { rooms, createRoom } = useRooms();
  const { messages, sendMessage, toggleLike } = useMessages(currentRoom?.id, user);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const docRef = doc(db, "patients", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
            setUserName(fullName || "User");
          } else {
            setUserName("User");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUserName("User");
        }
      } else {
        console.error("No authenticated user found");
      }
    });
    return () => unsubscribe();
  }, []);

  const getRoomsWithUnread = (rooms, messages) => {
    return rooms.map((room) => ({
      ...room,
      unreadCount: messages.filter(
        (msg) => msg.roomId === room.id && !msg.readBy?.includes(user?.uid)
      ).length,
    }));
  };

  const roomsWithUnread = getRoomsWithUnread(rooms, messages);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar
        rooms={roomsWithUnread}
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
        onCreateRoom={() => setShowModal(true)}
        userName={userName}
      />
      <div className="flex flex-col flex-1">
        {currentRoom ? (
          <>
            <ChatWindow
              messages={messages}
              onLike={toggleLike}
              user={user}
              userName={userName}
            />
            <MessageInput onSend={sendMessage}
             user={user}              
             userName={userName}      
              currentRoom={currentRoom} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a room to start chatting
          </div>
        )}
      </div>
      {showModal && (
        <CreateRoomModal
          onClose={() => setShowModal(false)}
          onCreate={async (name, desc) => {
            await createRoom(name, desc);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}