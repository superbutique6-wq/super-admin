"use client";

import React from 'react';
import { DollarSign, CreditCard, ArrowUpRight, TrendingUp, Download, Search } from 'lucide-react';

const TRANSACTIONS = [
  { id: 'TXN-1024', boutique: 'Prerna Silks', amount: '₹12,499', date: '2 hours ago', status: 'Success', plan: 'Pro' },
  { id: 'TXN-1023', boutique: 'Kavya Couture', amount: '₹4,999', date: '5 hours ago', status: 'Success', plan: 'Starter' },
  { id: 'TXN-1022', boutique: 'Ritu Creations', amount: '₹24,500', date: '1 day ago', status: 'Pending', plan: 'Pro' },
  { id: 'TXN-1021', boutique: 'Elegance India', amount: '₹8,999', date: '2 days ago', status: 'Success', plan: 'Pro' },
];

export default function SuperBillingPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-gray-900">Billing & Payments</h1>
          <p className="text-gray-500 mt-1">Monitor platform revenue and boutique subscriptions.</p>
        </div>
        <button className="flex items-center space-x-2 bg-white border border-gray-200 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition shadow-sm">
          <Download size={16} />
          <span>Export Report</span>
        </button>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <BillingStatCard title="Monthly Recurring Revenue" value="₹4,85,000" change="+12.5%" icon={<TrendingUp size={20} className="text-green-500" />} />
        <BillingStatCard title="Active Subscriptions" value="142" change="+3" icon={<CreditCard size={20} className="text-blue-500" />} />
        <BillingStatCard title="Average Payout" value="₹12,450" change="-2.1%" icon={<DollarSign size={20} className="text-purple-500" />} />
      </div>

      {/* Transactions Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
           <h3 className="font-semibold text-gray-800">Recent Transactions</h3>
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input type="text" placeholder="Search boutique..." className="pl-9 pr-4 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E5C1CD]" />
           </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaction ID</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Boutique</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
              <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {TRANSACTIONS.map(txn => (
              <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-mono text-xs text-gray-500">{txn.id}</td>
                <td className="py-4 px-6 font-medium text-gray-900">{txn.boutique}</td>
                <td className="py-4 px-6 font-semibold text-gray-900">{txn.amount}</td>
                <td className="py-4 px-6 text-gray-500 text-sm">{txn.date}</td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${txn.plan === 'Pro' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                    {txn.plan}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`flex items-center space-x-1 text-sm ${txn.status === 'Success' ? 'text-green-600' : 'text-yellow-600'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${txn.status === 'Success' ? 'bg-green-600' : 'bg-yellow-600'}`} />
                    <span>{txn.status}</span>
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                   <button className="text-gray-400 hover:text-blue-600 transition-colors">
                      <ArrowUpRight size={16} />
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

function BillingStatCard({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}
