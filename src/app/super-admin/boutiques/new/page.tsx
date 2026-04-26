"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Wand2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProvisionBoutique() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate database and provisioning delay
    setTimeout(() => {
      setLoading(false);
      router.push('/super-admin');
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/super-admin" className="inline-flex items-center space-x-2 text-gray-500 hover:text-[#333333] mb-8 transition-colors">
        <ArrowLeft size={20} />
        <span>Back to Dashboard</span>
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="mb-10 text-center">
          <div className="mx-auto w-16 h-16 bg-[#F1E5AC] rounded-full flex items-center justify-center mb-4">
            <Wand2 size={32} className="text-[#333333]" />
          </div>
          <h1 className="text-3xl font-serif text-[#333333]">Provision New Boutique</h1>
          <p className="text-gray-500 mt-2">Instantly create a new store instance for your client.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Boutique Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E5C1CD] focus:border-transparent transition-all"
                placeholder="e.g., Elegance India"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Boutique Identifier</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E5C1CD] focus:border-transparent transition-all bg-gray-50"
                placeholder="elegance-india"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Owner's Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E5C1CD] focus:border-transparent transition-all"
              placeholder="owner@elegance.com"
            />
            <p className="text-xs text-gray-500 mt-2">We will send the sub-admin login credentials to this email.</p>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full flex justify-center items-center space-x-2 bg-[#333333] text-white py-4 rounded-xl font-medium hover:bg-black transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <span>{loading ? 'Provisioning Environment...' : 'Deploy Boutique'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
