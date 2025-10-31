//@ts-nocheck
"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

export default function CreateRoomModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Room</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Room name"
          className="w-full border p-2 rounded-lg mb-2"
        />
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Room description"
          className="w-full border p-2 rounded-lg mb-4"
        />
        <button
          onClick={() => onCreate(name, desc)}
          disabled={!name.trim()}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg"
        >
          Create
        </button>
      </div>
    </div>
  );
}
