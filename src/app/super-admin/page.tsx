"use client";

import React, { useState, useMemo } from 'react';
import { Store, TrendingUp, Users, PlusCircle, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

// Shared data structure (In a real app, this would come from Firebase)
const INITIAL_BOUTIQUES = [
  { id: 'prerna-silks', name: "Prerna's Silks", owner: 'Prerna Sharma', email: 'prerna@silks.com', status: 'Active', plan: 'Pro', revenue: 124000 },
  { id: 'kavya-couture', name: 'Kavya Couture', owner: 'Kavya Mehta', email: 'kavya@couture.com', status: 'Active', plan: 'Enterprise', revenue: 85200 },
  { id: 'ritu-creations', name: 'Ritu Creations', owner: 'Ritu Verma', email: 'ritu@creations.com', status: 'Pending', plan: 'Pro', revenue: 0 },
  { id: 'label-manisha', name: 'Label Manisha', owner: 'Manisha J.', email: 'manisha@example.com', status: 'Deploying', plan: 'Basic', revenue: 12500 },
];

export default function SuperAdminDashboard() {
  const [boutiques] = useState(INITIAL_BOUTIQUES);

  // Dynamic stats
  const activeCount = useMemo(() => boutiques.filter(b => b.status === 'Active').length, [boutiques]);
  const totalRevenue = useMemo(() => boutiques.reduce((acc, b) => acc + b.revenue, 0), [boutiques]);
  const uniqueOwners = useMemo(() => new Set(boutiques.map(b => b.email)).size, [boutiques]);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-serif text-[#333333] mb-2 font-bold">Platform Overview</h1>
          <p className="text-gray-500">Real-time metrics across your {boutiques.length} boutique instances.</p>
        </div>
        <Link 
          href="/super-admin/boutiques/new" 
          className="flex items-center justify-center space-x-2 bg-[#1C1C1C] text-white px-6 py-3.5 rounded-xl hover:bg-black transition-all hover:scale-[1.02] shadow-lg shadow-black/10"
        >
          <PlusCircle size={20} />
          <span className="font-medium">Deploy New Store</span>
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard 
          title="Active Boutiques" 
          value={String(activeCount)} 
          icon={<Store className="text-[#E5C1CD]" />} 
          subtitle={`${boutiques.length - activeCount} Pending/Deploying`} 
        />
        <StatCard 
          title="Total Platform Revenue" 
          value={`₹${totalRevenue.toLocaleString()}`} 
          icon={<TrendingUp className="text-green-500" />} 
          subtitle="+12% from last month" 
        />
        <StatCard 
          title="Unique Store Owners" 
          value={String(uniqueOwners)} 
          icon={<Users className="text-blue-500" />} 
          subtitle="Across 3 regions"
        />
      </div>

      {/* Recent Deployments Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <h2 className="text-xl font-bold font-serif text-[#333333]">Recent Deployments</h2>
          <Link href="/super-admin/boutiques" className="text-sm font-bold text-blue-600 hover:underline tracking-tight">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Boutique Instance</th>
                <th className="py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Owner Contact</th>
                <th className="py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {boutiques.slice(0, 5).map(b => (
                <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-900">{b.name}</div>
                    <div className="text-xs text-gray-400 font-mono italic">id: {b.id}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900 text-sm font-medium">{b.owner}</div>
                    <div className="text-xs text-gray-400">{b.email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ring-1 ${b.plan === 'Enterprise' ? 'ring-purple-200 text-purple-700 bg-purple-50' : 'ring-gray-200 text-gray-600 bg-gray-50'}`}>
                      {b.plan.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Active') return <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700"><CheckCircle size={12}/><span>Live</span></span>;
  if (status === 'Deploying') return <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700"><Clock className="animate-spin" size={12}/><span>Provising</span></span>;
  return <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-50 text-yellow-700"><AlertTriangle size={12}/><span>Pending</span></span>;
}

function StatCard({ title, value, icon, subtitle }: { title: string; value: string; icon: React.ReactNode; subtitle?: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">{title}</h3>
        <div className="p-2.5 bg-gray-50 rounded-xl">{icon}</div>
      </div>
      <p className="text-3xl font-black text-[#1C1C1C] mb-1">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 font-medium">{subtitle}</p>}
    </div>
  );
}
