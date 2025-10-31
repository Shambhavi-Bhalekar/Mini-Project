'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; 
import { Calendar, Activity, Brain, Users, User,Menu, X, LogOut } from 'lucide-react';

interface DoctorSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function DoctorSidebar({ sidebarOpen, setSidebarOpen }: DoctorSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    console.log('Logged out'); 
    router.push('/login'); 
  };

  const menuItems = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: Activity, 
      href: '/doctor/dashboard',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      id: 'ai-detection', 
      label: 'AI Tumor Detection', 
      icon: Brain, 
      href: '/doctor/ai-detection',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      id: 'patients', 
      label: 'My Patients', 
      icon: Users, 
      href: '/doctor/patients',
      color: 'from-green-500 to-green-600'
    },
    { 
      id: 'appointments', 
      label: 'Appointments', 
      icon: Calendar, 
      href: '/doctor/appointments',
      color: 'from-orange-500 to-orange-600'
    },  
    { 
      id: 'profile', 
      label: 'profile', 
      icon: User, 
      href: '/doctor/profile',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <>
      {/* Sidebar - Fixed on mobile, sticky on desktop */}
      <aside 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:sticky top-16 left-0 z-20 ${
          isCollapsed ? 'w-20' : 'w-64'
        } h-[calc(100vh-5rem)] bg-gradient-to-b from-blue-600 via-indigo-600 to-violet-600 text-white transition-all duration-300 ease-in-out flex flex-col justify-between shadow-2xl`}>
        
        {/* Toggle button */}
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && (
            <div className="font-bold text-xl">MediMitra</div>
          )}
          <button 
            onClick={toggleSidebar} 
            className={`p-2 rounded-lg hover:bg-blue-500 transition-colors ${isCollapsed ? 'mx-auto' : ''}`}
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Navigation menu */}
        <nav className="flex-1 px-3 py-4 ">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id} className="group relative">
                <Link href={item.href}>
                  <div
                    className={`flex items-center p-3 rounded-xl w-full transition-all duration-200 cursor-pointer ${
                      pathname.includes(item.href)
                        ? 'bg-white text-indigo-600 font-semibold shadow-lg scale-105'
                        : 'text-white hover:bg-indigo-500 hover:bg-opacity-50 hover:scale-102'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <item.icon size={20} className={isCollapsed ? '' : 'mr-3'} />
                    {!isCollapsed && <span className="text-sm">{item.label}</span>}
                  </div>
                </Link>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none shadow-xl">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout section */}
        <div className="p-4 border-t border-indigo-700">
          <button 
            onClick={handleLogout} 
            className={`group relative flex items-center gap-3 p-3 rounded-xl transition-all duration-200 w-full bg-red-500 bg-opacity-20 hover:bg-red-500 hover:bg-opacity-100 border border-red-400 border-opacity-30 hover:border-opacity-0 hover:scale-105 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            aria-label="Logout"
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="font-medium">Logout</span>}
            
            {/* Tooltip for collapsed logout */}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none shadow-xl">
                Logout
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}