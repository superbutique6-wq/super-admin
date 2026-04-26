"use client";

import React from 'react';
import { Mail, Phone, Calendar, User, MoreVertical, Search, Filter } from 'lucide-react';

const OWNERS = [
  { id: 1, name: 'Prerna Sharma', email: 'prerna@silks.com', phone: '+91 98765 43210', joined: 'Oct 2023', boutiques: 1, status: 'Active' },
  { id: 2, name: 'Kavya Mehta', email: 'kavya@couture.com', phone: '+91 99887 76655', joined: 'Nov 2023', boutiques: 2, status: 'Active' },
  { id: 3, name: 'Ritu Verma', email: 'ritu@creations.com', phone: '+91 88776 65544', joined: 'Jan 2024', boutiques: 1, status: 'Active' },
  { id: 4, name: 'Anjali Gupta', email: 'anjali@elegance.com', phone: '+91 77665 54433', joined: 'Feb 2024', boutiques: 3, status: 'Inactive' },
];

export default function SuperOwnersPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-gray-900">Boutique Owners</h1>
          <p className="text-gray-500 mt-1">Manage platform users and their access levels.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/30">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search owners..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5C1CD]" />
          </div>
          <button className="flex items-center space-x-2 text-sm text-gray-600 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition shadow-sm">
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
          {OWNERS.map(owner => (
            <div key={owner.id} className="bg-white p-6 hover:bg-gray-50 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#F9F7F1] rounded-full flex items-center justify-center text-[#E5C1CD] border border-[#E5C1CD]/20">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{owner.name}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${owner.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>
                       {owner.status}
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Mail size={14} />
                  <span>{owner.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Phone size={14} />
                  <span>{owner.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar size={14} />
                  <span>Joined {owner.joined}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs font-medium text-gray-400">{owner.boutiques} Boutique(s)managed</span>
                <button className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-widest transition-all">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
