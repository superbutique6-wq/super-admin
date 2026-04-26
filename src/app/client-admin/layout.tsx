import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Settings, Grid, Bell, Tag } from 'lucide-react';

export default function ClientAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Client Admin Sidebar */}
      <aside className="w-64 bg-[#1C1C1C] text-white shadow-2xl flex flex-col justify-between">
        <div>
          <div className="p-6 text-center border-b border-gray-800">
            <h2 className="text-xl font-bold font-serif tracking-wider text-[#E5C1CD]">PRERNA SILKS</h2>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Store Management</p>
          </div>
          <nav className="p-4 space-y-2 mt-4">
            <Link href="/client-admin" className="flex items-center space-x-3 p-3 rounded-lg bg-white/10 text-white font-medium transition-colors hover:bg-white/20">
              <LayoutDashboard size={18} />
              <span className="text-sm tracking-wide">Overview</span>
            </Link>
            <Link href="/client-admin/products" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
              <ShoppingBag size={18} />
              <span className="text-sm tracking-wide">Products</span>
            </Link>
            <Link href="/client-admin/categories" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
              <Grid size={18} />
              <span className="text-sm tracking-wide">Categories</span>
            </Link>
            <Link href="/client-admin" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
              <Tag size={18} />
              <span className="text-sm tracking-wide">Discounts</span>
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-800">
          <Link href="/client-admin/settings" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <Settings size={18} />
            <span className="text-sm tracking-wide">Store Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        {/* Topbar */}
        <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-8">
          <div className="text-sm text-gray-500 font-medium">Boutique ID: <span className="text-gray-900">prerna-silks</span></div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300"></div>
          </div>
        </header>
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
