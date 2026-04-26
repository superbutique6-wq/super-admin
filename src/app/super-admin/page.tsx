import React from 'react';
import { Store, TrendingUp, Users, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function SuperAdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-serif text-[#333333] mb-2">Welcome, Creator</h1>
          <p className="text-gray-500">Here's what's happening across your boutique empire today.</p>
        </div>
        <Link 
          href="/super-admin/boutiques/new" 
          className="flex items-center space-x-2 bg-[#333333] text-white px-5 py-3 rounded-full hover:bg-black transition-colors"
        >
          <PlusCircle size={20} />
          <span>Provision New Boutique</span>
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Active Boutiques" value="12" icon={<Store className="text-[#E5C1CD]" />} />
        <StatCard title="Total Revenue" value="₹2,45,000" icon={<TrendingUp className="text-green-500" />} subtitle="+15% this month" />
        <StatCard title="Active Owners" value="15" icon={<Users className="text-blue-500" />} />
      </div>

      {/* Recent Boutiques Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-serif text-[#333333] mb-6">Recent Deployments</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-4 font-semibold text-gray-500">Boutique Name</th>
                <th className="py-4 px-4 font-semibold text-gray-500">Owner Email</th>
                <th className="py-4 px-4 font-semibold text-gray-500">Status</th>
                <th className="py-4 px-4 font-semibold text-gray-500">Plan</th>
              </tr>
            </thead>
            <tbody>
              <TableRow name="Prerna's Silks" email="prerna@example.com" status="Active" plan="Pro" />
              <TableRow name="Komal Couture" email="komal@example.com" status="Active" plan="Enterprise" />
              <TableRow name="Label Manisha" email="manisha@example.com" status="Deploying" plan="Basic" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, subtitle }: { title: string, value: string, icon: React.ReactNode, subtitle?: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-500 font-medium">{title}</h3>
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      </div>
      <p className="text-3xl font-bold text-[#333333] mb-1">{value}</p>
      {subtitle && <p className="text-sm text-green-600 font-medium">{subtitle}</p>}
    </div>
  );
}

function TableRow({ name, email, status, plan }: { name: string, email: string, status: string, plan: string }) {
  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
      <td className="py-4 px-4 font-medium">{name}</td>
      <td className="py-4 px-4 text-gray-500">{email}</td>
      <td className="py-4 px-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {status}
        </span>
      </td>
      <td className="py-4 px-4 text-gray-600">{plan}</td>
    </tr>
  );
}
