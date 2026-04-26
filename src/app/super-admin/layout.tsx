import React from 'react';
import Link from 'next/link';
import { Home, Store, Settings, Users, CreditCard } from 'lucide-react';

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#FFFFF0] text-[#333333] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col justify-between">
        <div>
          <div className="p-6 text-center border-b border-gray-100">
            <h2 className="text-2xl font-bold font-serif text-[#E5C1CD]">Platform Admin</h2>
            <p className="text-xs text-gray-500 mt-1">Creator's Dashboard</p>
          </div>
          <nav className="p-4 space-y-2">
            <Link href="/super-admin" className="flex items-center space-x-3 p-3 rounded-lg bg-[#F9F7F1] text-[#333333] font-medium transition-colors hover:bg-[#F1E5AC]">
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
            <Link href="/super-admin/boutiques" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-[#F9F7F1] transition-colors">
              <Store size={20} />
              <span>Manage Boutiques</span>
            </Link>
            <Link href="/super-admin/billing" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-[#F9F7F1] transition-colors">
              <CreditCard size={20} />
              <span>Billing & Payments</span>
            </Link>
            <Link href="/super-admin/users" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-[#F9F7F1] transition-colors">
              <Users size={20} />
              <span>Owners</span>
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-100">
          <Link href="/super-admin/settings" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-[#F9F7F1] transition-colors">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
