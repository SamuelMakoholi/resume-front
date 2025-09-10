'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarProps {
  user: {
    id: number;
    name: string;
    email: string;
    subscription: 'free' | 'premium' | 'expired';
  };
  onLogout: () => void;
}

export default function Sidebar({ user, onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { 
      icon: '🏠', 
      label: 'Dashboard', 
      href: '/dashboard',
      active: pathname === '/dashboard'
    },
    { 
      icon: '📄', 
      label: 'CV/Resumes', 
      href: '/dashboard/resumes',
      active: pathname === '/dashboard/resumes'
    },
    { 
      icon: '✉️', 
      label: 'Cover Letters', 
      href: '/dashboard/cover-letters',
      active: pathname === '/dashboard/cover-letters'
    },
    { 
      icon: '🎨', 
      label: 'Templates', 
      href: '/dashboard/templates',
      active: pathname === '/dashboard/templates'
    },
    { 
      icon: '💎', 
      label: 'Subscription', 
      href: '/dashboard/subscription',
      active: pathname === '/dashboard/subscription'
    },
    { 
      icon: '⚙️', 
      label: 'Settings', 
      href: '/dashboard/settings',
      active: pathname === '/dashboard/settings'
    },
  ];

  const getSubscriptionBadge = () => {
    switch (user.subscription) {
      case 'premium':
        return <span className="px-2 py-1 text-xs bg-green-500 text-black rounded-full font-medium">Premium</span>;
      case 'expired':
        return <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full font-medium">Expired</span>;
      default:
        return <span className="px-2 py-1 text-xs bg-gray-600 text-white rounded-full font-medium">Free</span>;
    }
  };

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-black text-white min-h-screen transition-all duration-300 flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-green-500">Resume Builder</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg 
              className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
          <div className="mt-2">
            {getSubscriptionBadge()}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-green-600 text-black font-medium' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-green-400'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className={`flex items-center space-x-3 p-3 w-full rounded-lg text-red-400 hover:bg-red-900 hover:bg-opacity-20 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <span className="text-lg">🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
