'use client';

import React, { useState } from 'react';
import { Home, PlusCircle, Sparkles, GitCompare, Archive, Settings, MapPin, ChevronUp, ChevronDown, LogOut, Sliders } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

export default function SideNav() {
  const [activeItem, setActiveItem] = useState('home');
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const router = useRouter();

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: <Home size={20} />, href: '/dashboard' },
    { id: 'create', label: 'Create Idea', icon: <PlusCircle size={20} />, href: '/create' },
    { id: 'analyzer', label: 'AI Analyzer', icon: <Sparkles size={20} />, href: '/analyzer' },
    { id: 'vault', label: 'Idea Vault', icon: <Archive size={20} />, href: '/vault' },
  ];

  const handleNavClick = (id: string, href: string) => {
    setActiveItem(id);
    router.push(href);
  };

  return (
    <div className="flex flex-col h-screen w-52 bg-gradient-to-b from-slate-900 to-slate-800 text-white fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-2 p-6 border-b border-slate-700/50">
        <MapPin size={20} className="text-blue-400" />
        <h1 className="text-xl font-semibold">IdeaPulse</h1>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id, item.href)}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg
              transition-all duration-200 text-left
              ${
                activeItem === item.id
                  ? 'bg-blue-500/20 text-white border border-blue-500/30'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }
            `}
          >
            <span className={activeItem === item.id ? 'text-blue-400' : ''}>
              {item.icon}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-slate-700/50 relative">
        {/* Dropup Menu */}
        {showSettingsDropdown && (
          <div className="absolute bottom-full left-4 right-4 mb-2 space-y-1 bg-slate-800 border border-slate-700/50 rounded-lg p-2">
            <button
              onClick={() => {
                setShowSettingsDropdown(false);
                router.push('/settings/advanced');
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-lg transition-all duration-200 text-left"
            >
              <Sliders size={16} />
              <span className="text-sm">Advanced Settings</span>
            </button>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = '/';
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-all duration-200 text-left"
            >
              <LogOut size={16} />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        )}
        
        <button
          onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
          className={`
            w-full flex items-center justify-between px-4 py-3 rounded-lg
            transition-all duration-200 text-left
            ${
              showSettingsDropdown
                ? 'bg-blue-500/20 text-white border border-blue-500/30'
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
            }
          `}
        >
          <div className="flex items-center gap-3">
            <Settings size={20} className={showSettingsDropdown ? 'text-blue-400' : ''} />
            <span className="text-sm font-medium">Settings</span>
          </div>
          {showSettingsDropdown ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>
    </div>
  );
}