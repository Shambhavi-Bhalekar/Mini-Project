//@ts-nocheck
"use client";
import React, { useRef, useEffect } from "react";
import { Clock, Heart } from "lucide-react";
import { formatTime } from "./utils";

export default function ChatWindow({ messages, onLike, user, userName }) {
  const endRef = useRef();
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className="bg-white rounded-xl p-4 shadow">
          <div className="flex items-start gap-4">
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">
                  {msg.authorId === user?.uid ? "You" : msg.authorName || "Unknown User"}
                </span>
                <Clock size={14} className="text-gray-400" />
                <span className="text-sm text-gray-500">
                  {formatTime(msg.timestamp?.toDate?.() || msg.timestamp || new Date())}
                </span>
              </div>
              {msg.title && <h3 className="font-bold text-lg">{msg.title}</h3>}
              <p className="text-gray-800 whitespace-pre-wrap">{msg.text}</p>
              <button
                onClick={() => onLike(msg.id, msg.likedBy?.includes(user?.uid) || false)}
                className={`flex items-center gap-1 mt-2 ${
                  msg.likedBy?.includes(user?.uid) ? "text-red-500" : "text-gray-500"
                }`}
                disabled={!user || !msg.likedBy}
              >
                <Heart
                  size={16}
                  className={msg.likedBy?.includes(user?.uid) ? "fill-red-500" : ""}
                />
                {msg.likes || 0}
              </button>
            </div>
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}