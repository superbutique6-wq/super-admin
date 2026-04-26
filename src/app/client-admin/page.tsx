"use client";

import React, { useState } from 'react';
import { Package, Eye, DollarSign, TrendingUp, X, MessageCircle, Check } from 'lucide-react';
import Link from 'next/link';

type Inquiry = { id: number; customer: string; product: string; date: string; status: string };
const INITIAL_INQUIRIES: Inquiry[] = [
  { id: 1, customer: "Aishwarya R.", product: "Rose Zari Anarkali", date: "2 hours ago", status: "Pending" },
  { id: 2, customer: "Deepika P.", product: "Ivory Silk Blouse", date: "5 hours ago", status: "Responded" },
  { id: 3, customer: "Sara K.", product: "Blush Floral Lehenga", date: "1 day ago", status: "Resolved" },
];

export default function ClientAdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState(false);

  const handleReply = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setReplyText('');
    setReplySent(false);
  };

  const sendReply = () => {
    if (!replyText.trim()) return;
    setInquiries(prev => prev.map(i => i.id === selectedInquiry?.id ? { ...i, status: 'Responded' } : i));
    setReplySent(true);
    setTimeout(() => setSelectedInquiry(null), 1500);
  };

  const whatsappURL = (product: string) =>
    `https://wa.me/919876543210?text=Hi!%20I%20have%20a%20query%20about%20${encodeURIComponent(product)}`;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif text-gray-900 mb-1">Your Boutique Dashboard</h1>
          <p className="text-gray-500">Here's what's going on at Prerna Silks today.</p>
        </div>
        <Link href="/client-admin/products" className="bg-[#1C1C1C] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors">
          + Add New Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Views" value="12,450" icon={<Eye size={20} className="text-blue-500" />} />
        <StatCard title="Active Listings" value="48" icon={<Package size={20} className="text-purple-500" />} />
        <StatCard title="Inquiries" value={String(inquiries.length)} icon={<TrendingUp size={20} className="text-green-500" />} />
        <StatCard title="Sales Volume" value="₹85,000" icon={<DollarSign size={20} className="text-[#E5C1CD]" />} />
      </div>

      {/* Inquiries */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-10">
        <h2 className="text-xl font-semibold mb-6">Recent Customer Inquiries</h2>
        <div className="space-y-4">
          {inquiries.map(inq => (
            <div key={inq.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 gap-4">
              <div>
                <h4 className="font-medium text-gray-900">{inq.customer} <span className="text-sm font-normal text-gray-500">asked about</span> <span className="text-[#333333]">{inq.product}</span></h4>
                <p className="text-xs text-gray-400 mt-1">{inq.date}</p>
              </div>
              <div className="flex items-center space-x-3 shrink-0">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${inq.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : inq.status === 'Responded' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{inq.status}</span>
                <button onClick={() => handleReply(inq)} className="text-sm text-white bg-[#1C1C1C] px-3 py-1.5 rounded-lg font-medium hover:bg-black transition-colors">Reply</button>
                <a href={whatsappURL(inq.product)} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-sm text-green-600 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg font-medium hover:bg-green-100 transition-colors">
                  <MessageCircle size={14} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reply Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h3 className="font-semibold">Reply to {selectedInquiry.customer}</h3>
              <button onClick={() => setSelectedInquiry(null)} className="text-gray-400 hover:text-gray-600"><X size={18}/></button>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-500 mb-3">Regarding: <strong>{selectedInquiry.product}</strong></p>
              {replySent ? (
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg">
                  <Check size={20}/><span className="font-medium">Reply sent successfully!</span>
                </div>
              ) : (
                <>
                  <textarea
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    rows={4}
                    placeholder="Type your reply here..."
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5C1CD] resize-none"
                  />
                  <div className="flex space-x-3 mt-4">
                    <button onClick={sendReply} disabled={!replyText.trim()} className="flex-1 bg-[#1C1C1C] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Send Reply</button>
                    <a href={whatsappURL(selectedInquiry.product)} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 px-4 py-2.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                      <MessageCircle size={14}/><span>WhatsApp</span>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">{title}</h3>
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
