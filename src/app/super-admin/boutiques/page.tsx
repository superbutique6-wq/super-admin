"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, MoreHorizontal, Globe, CheckCircle, AlertCircle } from 'lucide-react';

const initialBoutiques = [
  { id: 'prerna-silks', name: 'Prerna Silks', owner: 'Prerna Sharma', domain: 'prerna-silks.boutique.app', status: 'Active', plan: 'Pro', revenue: '₹1,24,000' },
  { id: 'kavya-couture', name: 'Kavya Couture', owner: 'Kavya Mehta', domain: 'kavya-couture.boutique.app', status: 'Active', plan: 'Starter', revenue: '₹45,200' },
  { id: 'ritu-creations', name: 'Ritu Creations', owner: 'Ritu Verma', domain: 'ritu-creations.boutique.app', status: 'Pending', plan: 'Pro', revenue: '₹0' },
];

export default function ManageBoutiquesPage() {
  const [boutiques, setBoutiques] = useState(initialBoutiques);

  const deactivate = (id: string) => {
    setBoutiques(bs => bs.map(b => b.id === id ? { ...b, status: b.status === 'Active' ? 'Suspended' : 'Active' } : b));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-gray-900">All Boutiques</h1>
          <p className="text-gray-500 mt-1">Manage every store on the platform.</p>
        </div>
        <Link
          href="/super-admin/boutiques/new"
          className="flex items-center space-x-2 bg-[#1C1C1C] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition"
        >
          <Plus size={16} />
          <span>Provision New Boutique</span>
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Boutique</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Domain</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {boutiques.map(b => (
              <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-semibold text-gray-900">{b.name}</td>
                <td className="py-4 px-6 text-gray-500">{b.owner}</td>
                <td className="py-4 px-6">
                  <a href={`https://${b.domain}`} target="_blank" className="flex items-center space-x-1 text-blue-600 hover:underline text-sm">
                    <Globe size={12} />
                    <span>{b.domain}</span>
                  </a>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${b.plan === 'Pro' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>{b.plan}</span>
                </td>
                <td className="py-4 px-6 font-medium text-gray-900">{b.revenue}</td>
                <td className="py-4 px-6">
                  {b.status === 'Active' ? (
                    <span className="flex items-center space-x-1 text-green-600 text-sm"><CheckCircle size={14}/><span>Active</span></span>
                  ) : b.status === 'Pending' ? (
                    <span className="flex items-center space-x-1 text-yellow-600 text-sm"><AlertCircle size={14}/><span>Pending</span></span>
                  ) : (
                    <span className="flex items-center space-x-1 text-red-500 text-sm"><AlertCircle size={14}/><span>Suspended</span></span>
                  )}
                </td>
                <td className="py-4 px-6 text-right space-x-3">
                  <button
                    onClick={() => deactivate(b.id)}
                    className={`text-xs font-medium px-3 py-1 rounded-lg transition ${b.status === 'Active' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                  >
                    {b.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
