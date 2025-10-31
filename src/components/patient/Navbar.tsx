//@ts-nocheck
"use client";
import React, { useState } from "react";
import { Plus, Hash, Users } from "lucide-react";

export default function Navbar({ rooms, currentRoom, setCurrentRoom, onCreateRoom }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 md:p-4 rounded-lg">
          <h1 className="text-lg md:text-xl font-bold text-white">Community Hub</h1>
          <p className="text-blue-100 text-xs">Connect, Share, Support</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onCreateRoom}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 md:px-4 py-2 rounded-xl text-sm md:text-base"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Create Room</span>
          </button>
          
          <button
            className="md:hidden text-gray-700 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop: Horizontal scrollable rooms */}
      <div className="hidden md:flex gap-2 mt-4 overflow-x-auto pb-2">
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => setCurrentRoom(room)}
            className={`p-3 rounded-xl cursor-pointer flex items-center gap-2 whitespace-nowrap transition-colors ${
              currentRoom?.id === room.id
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Hash size={16} />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{room.name}</span>
              <span className="text-xs flex items-center gap-1">
                <Users size={12} />
                {room.memberCount} members
                {room.unreadCount > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {room.unreadCount}
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: Dropdown menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2">
          {rooms.map((room) => (
            <div
              key={room.id}
              onClick={() => {
                setCurrentRoom(room);
                setIsMenuOpen(false);
              }}
              className={`p-3 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                currentRoom?.id === room.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Hash size={16} />
                <span className="font-semibold text-sm">{room.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Users size={12} />
                <span>{room.memberCount}</span>
                {room.unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                    {room.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}