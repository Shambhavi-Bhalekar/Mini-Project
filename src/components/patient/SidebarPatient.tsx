//@ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Calendar,
  User,
  Home,
  Search,
  GroupIcon,
  PhoneCall,
  Apple,
  Menu,
  X,
  BotIcon,
  AlertCircle,
} from 'lucide-react';

interface PatientSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function PatientSidebar({
  sidebarOpen,
  setSidebarOpen,
  isCollapsed,
  setIsCollapsed,
}: PatientSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleLogout = () => {
    console.log('Logged out');
    router.push('/login');
  };

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', href: '/patient/dashboard' },
    { id: 'my-profile', icon: User, label: 'My Profile', href: '/patient/profile' },
    { id: 'appointments', icon: Calendar, label: 'Appointments', href: '/patient/appointments' },
    { id: 'connect', icon: PhoneCall, label: 'Call AI consultant', href: '/patient/connect' },
    { id: 'community', icon: GroupIcon, label: 'Community', href: '/patient/community' },
    { id: 'ChatBot', icon: BotIcon, label: 'Stress Reliever Bot', href: '/patient/chatbot' },

  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed top-16 left-0 z-20 ${
          isCollapsed ? 'w-16' : 'w-64'
        } h-[calc(100vh-4rem)] bg-gradient-to-b from-blue-600 via-indigo-600 to-violet-600 text-white 
        transition-all duration-300 ease-in-out flex flex-col justify-between shadow-lg overflow-y-auto`}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between flex-shrink-0">
          {!isCollapsed && <div className="font-bold text-xl">MediMitra</div>}
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-lg hover:bg-blue-500 transition-colors flex-shrink-0 ${
              isCollapsed ? 'mx-auto' : ''
            }`}
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-600">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id} className="relative group">
                <Link href={item.href}>
                  <div
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center p-3 rounded-lg w-full transition-all duration-200 cursor-pointer ${
                      pathname.includes(item.href)
                        ? 'bg-white text-indigo-600 font-medium shadow-md'
                        : 'text-white hover:bg-indigo-500 hover:bg-opacity-80'
                    }`}
                  >
                    <item.icon size={20} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}

                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                        {item.label}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-indigo-700 flex-shrink-0">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-300 ease-in-out w-full hover:bg-red-500 hover:bg-opacity-80 group relative ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <AlertCircle size={20} className="flex-shrink-0" />
            {!isCollapsed && <span>Logout</span>}

            {isCollapsed && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                Logout
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
