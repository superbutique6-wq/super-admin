"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Settings, 
  Grid, 
  Bell, 
  Tag, 
  X, 
  LogOut,
  ChevronRight
} from 'lucide-react';

export default function ClientAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [hasNew, setHasNew] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1C1C1C] text-white shadow-2xl flex flex-col justify-between shrink-0">
        <div>
          <div className="p-8 text-center border-b border-gray-800">
            <h2 className="text-xl font-bold font-serif tracking-wider text-[#E5C1CD]">PRERNA SILKS</h2>
            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-[0.4em]">Store Management</p>
          </div>
          <nav className="p-4 space-y-2 mt-4">
            <Link href="/client-admin" className="flex items-center space-x-3 p-3 rounded-lg bg-white/10 text-white font-medium transition-all hover:bg-white/20">
              <LayoutDashboard size={18} />
              <span className="text-sm tracking-wide">Overview</span>
            </Link>
            <Link href="/client-admin/products" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
              <ShoppingBag size={18} />
              <span className="text-sm tracking-wide">Products</span>
            </Link>
            <Link href="/client-admin/categories" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
              <Grid size={18} />
              <span className="text-sm tracking-wide">Categories</span>
            </Link>
            <Link href="/client-admin" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
              <Tag size={18} />
              <span className="text-sm tracking-wide">Discounts</span>
            </Link>
          </nav>
        </div>
        <div className="p-6 border-t border-gray-800">
          <Link href="/client-admin/settings" className="flex items-center space-x-3 text-sm text-gray-400 hover:text-[#E5C1CD] transition-colors mb-6">
            <Settings size={18} />
            <span>Settings</span>
          </Link>
          <Link href="/store" target="_blank" className="flex items-center space-x-3 text-sm text-red-400 hover:text-red-300 transition-colors">
            <LogOut size={18} className="rotate-180" />
            <span>Exit to Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Modern Header */}
        <header className="bg-white/80 backdrop-blur-md h-20 border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-30">
          <div className="flex items-center space-x-2 text-sm text-gray-400 font-medium">
             <span>Boutique</span>
             <ChevronRight size={14} />
             <span className="text-[#1C1C1C] font-bold">Prerna Silks</span>
          </div>

          <div className="flex items-center space-x-6">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => { setShowNotifs(!showNotifs); if (showNotifs) setHasNew(false); }}
                className={`p-3 rounded-2xl border transition-all relative ${showNotifs ? 'bg-[#1C1C1C] text-white border-black shadow-lg shadow-black/10' : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-white hover:border-gray-200'}`}
              >
                <Bell size={20} />
                {hasNew && <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
              </button>

              {/* In-App Notification Dropdown */}
              {showNotifs && (
                <div className="absolute top-16 right-0 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-4 duration-300 z-50">
                   <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                      <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-400">Activity Center</h3>
                      <button onClick={() => setShowNotifs(false)} className="text-gray-300 hover:text-gray-500"><X size={16}/></button>
                   </div>
                   <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-50">
                      <NotificationItem 
                        title="New Enquiry" 
                        desc="Komal K. is interested in Rose Zari Anarkali." 
                        time="Just now" 
                        isNew={true} 
                        icon="✨"
                      />
                      <NotificationItem 
                        title="Storage Alert" 
                        desc="Cloudinary integration is pending your configuration." 
                        time="2h ago" 
                        isNew={false} 
                        icon="📦"
                      />
                      <NotificationItem 
                        title="Welcome" 
                        desc="Start exploring your new designer dashboard." 
                        time="1d ago" 
                        isNew={false} 
                        icon="👑"
                      />
                   </div>
                   <button className="w-full p-4 text-[10px] font-bold text-blue-600 hover:bg-gray-50 uppercase tracking-widest border-t border-gray-50">
                      View all activity
                   </button>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3 pl-6 border-l border-gray-100">
               <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 leading-none">P. Sharma</p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase font-medium">Owner</p>
               </div>
               <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E5C1CD] to-[#C5A1AD] border border-white shadow-sm shadow-[#C5A1AD]/20" />
            </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="p-10 flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

function NotificationItem({ title, desc, time, isNew, icon }: any) {
  return (
    <div className={`p-5 flex items-start space-x-4 hover:bg-gray-50 transition-colors cursor-pointer ${isNew ? 'bg-blue-50/10' : ''}`}>
       <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg">{icon}</div>
       <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
             <h4 className="text-sm font-bold text-gray-900">{title}</h4>
             <span className="text-[9px] text-gray-400 font-bold uppercase">{time}</span>
          </div>
          <p className="text-xs text-gray-500 leading-tight font-light">{desc}</p>
       </div>
       {isNew && <div className="mt-2 w-1.5 h-1.5 bg-blue-600 rounded-full" />}
    </div>
  );
}
