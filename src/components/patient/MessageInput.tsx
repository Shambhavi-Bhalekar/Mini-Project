//@ts-nocheck
"use client";
import React, { useState } from "react";
import { Send, MessageSquare } from "lucide-react";

export default function MessageInput({ onSend, user, userName, currentRoom }) {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isPost, setIsPost] = useState(false);

  const handleSend = () => {
    if (text.trim() && user && userName && (!isPost || title.trim())) {
      onSend({
        text,
        title: isPost ? title : undefined, 
        authorId: user.uid,
        authorName: userName, 
        timestamp: new Date(),
        likes: 0,
        likedBy: [],
        roomId: currentRoom?.id || null, 
        isPost,
      });
      setText("");
      setTitle("");
      setIsPost(false);
    } else {
      console.warn("Failed to send message: ", {
        text: text.trim(),
        user: !!user,
        userName: !!userName,
        title: isPost ? title.trim() : "N/A",
        roomId: currentRoom?.id,
      });
    }
  };

  return (
    <div className="bg-white border-t p-4 shadow">
      {isPost && (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title..."
          className="w-full mb-2 p-2 border rounded-lg"
        />
      )}
      <div className="flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={isPost ? "Write your post..." : "Type a message..."}
          className="flex-1 p-2 border rounded-lg resize-none"
          rows={isPost ? 3 : 1}
        />
        <button
          onClick={() => setIsPost(!isPost)}
          className={`p-2 rounded-lg ${isPost ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          <MessageSquare size={18} />
        </button>
        <button
          onClick={handleSend}
          disabled={!text.trim() || (isPost && !title.trim()) || !user || !userName}
          className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}