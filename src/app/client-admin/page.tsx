import React from 'react';
import { Package, View, DollarSign, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function ClientAdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif text-gray-900 mb-1">Your Boutique Dashboard</h1>
          <p className="text-gray-500">Here’s what’s going on at Prerna Silks today.</p>
        </div>
        <Link 
          href="/client-admin/products"
          className="bg-[#1C1C1C] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors"
        >
          Add New Product
        </Link>
      </div>

      {/* Store Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <ClientStatCard title="Total Views" value="12,450" icon={<View size={20} className="text-blue-500" />} />
        <ClientStatCard title="Active Listings" value="48" icon={<Package size={20} className="text-purple-500" />} />
        <ClientStatCard title="Inquiries" value="23" icon={<TrendingUp size={20} className="text-green-500" />} />
        <ClientStatCard title="Sales Volume" value="₹85,000" icon={<DollarSign size={20} className="text-[#E5C1CD]" />} />
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-10">
        <h2 className="text-xl font-semibold mb-6">Recent Customer Inquiries (WhatsApp / Customization)</h2>
        <div className="space-y-4">
          <InquiryRow customer="Aishwarya R." product="Rose Zari Anarkali" date="2 hours ago" status="Pending" />
          <InquiryRow customer="Deepika P." product="Ivory Silk Blouse" date="5 hours ago" status="Responded" />
          <InquiryRow customer="Sara K." product="Blush Floral Lehenga" date="1 day ago" status="Resolved" />
        </div>
      </div>
    </div>
  );
}

function ClientStatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function InquiryRow({ customer, product, date, status }: { customer: string, product: string, date: string, status: string }) {
  const statusColor = status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : status === 'Responded' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700';
  
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
      <div>
        <h4 className="font-medium text-gray-900">{customer} <span className="text-sm font-normal text-gray-500 ml-2">asked about</span> {product}</h4>
        <p className="text-xs text-gray-500 mt-1">{date}</p>
      </div>
      <div className="flex items-center space-x-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {status}
        </span>
        <button className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors">Reply</button>
      </div>
    </div>
  );
}
