"use client";

import React, { useState, useMemo } from 'react';
import { Package, Eye, DollarSign, TrendingUp, X, MessageCircle, Check, LogOut, Settings, User } from 'lucide-react';
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

  // Simulated dynamic stats
  const pendingInquiries = useMemo(() => inquiries.filter(i => i.status === 'Pending').length, [inquiries]);

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
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-serif text-[#1C1C1C] mb-2 font-bold">Studio Overview</h1>
          <p className="text-gray-500">Managing <span className="font-semibold text-gray-800">Prerna Silks</span> active instance.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-black hover:bg-gray-50 transition-all shadow-sm">
            <Settings size={20} />
          </button>
          <Link href="/client-admin/products" className="bg-[#1C1C1C] text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-black/10">
            + New Product
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Direct Views" value="12.4k" icon={<Eye size={20} className="text-blue-500" />} />
        <StatCard title="Portfolio items" value="48" icon={<Package size={20} className="text-purple-500" />} />
        <StatCard title="Active Enquiries" value={String(pendingInquiries)} icon={<TrendingUp size={20} className="text-green-500" />} />
        <StatCard title="Sales Est." value="₹85k" icon={<DollarSign size={20} className="text-[#E5C1CD]" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Inquiries */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
             <h2 className="text-xl font-bold font-serif text-[#1C1C1C]">Customer Enquiries</h2>
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{inquiries.length} total</span>
          </div>
          <div className="divide-y divide-gray-50">
            {inquiries.map(inq => (
              <div key={inq.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-gray-50/50 transition-all gap-4">
                <div>
                  <h4 className="font-bold text-gray-900 group cursor-pointer hover:text-[#C5A1AD] transition-colors">{inq.customer}</h4>
                  <p className="text-sm text-gray-500 mt-0.5">Query regarding <span className="text-[#1C1C1C] font-medium">{inq.product}</span></p>
                  <p className="text-[10px] text-gray-400 mt-2 font-medium tracking-wider uppercase">{inq.date}</p>
                </div>
                <div className="flex items-center space-x-3 shrink-0">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${inq.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'}`}>{inq.status}</span>
                  <button onClick={() => handleReply(inq)} className="text-xs text-[#1C1C1C] font-bold border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all">Reply</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
           <div className="bg-[#1C1C1C] rounded-2xl p-6 text-white shadow-xl shadow-black/20">
              <div className="w-12 h-12 bg-white/10 rounded-xl mb-4 flex items-center justify-center">
                 <User className="text-[#E5C1CD]" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Prerna Sharma</h3>
              <p className="text-sm text-gray-400 font-light mb-6">Administrator Access</p>
              <button onClick={() => alert("Simulation: Logged out")} className="w-full py-3 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center space-x-2">
                 <LogOut size={16} />
                 <span>Sign Out</span>
              </button>
           </div>
           
           <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Quick Links</h4>
              <nav className="space-y-2">
                 <Link href="/store" target="_blank" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 group transition-all">
                    <span className="text-sm font-medium text-gray-700">View Public Store</span>
                    <TrendingUp size={16} className="text-gray-300 group-hover:text-black" />
                 </Link>
                 <Link href="/client-admin/settings" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 group transition-all">
                    <span className="text-sm font-medium text-gray-700">Live Customizer</span>
                    <Settings size={16} className="text-gray-300 group-hover:text-black" />
                 </Link>
              </nav>
           </div>
        </div>
      </div>

      {/* Reply Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/30">
              <h3 className="font-serif text-xl font-bold">Reply to {selectedInquiry.customer}</h3>
              <button onClick={() => setSelectedInquiry(null)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
            </div>
            <div className="p-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">RE: {selectedInquiry.product}</p>
              {replySent ? (
                <div className="flex flex-col items-center justify-center py-8 text-green-600">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <Check size={32}/><span className="sr-only">Check</span>
                  </div>
                  <span className="font-bold">Reply sent successfully!</span>
                </div>
              ) : (
                <>
                  <textarea
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    rows={5}
                    placeholder="Type your message to the client..."
                    className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5C1CD] resize-none transition-all"
                  />
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <button onClick={sendReply} disabled={!replyText.trim()} className="bg-[#1C1C1C] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black disabled:opacity-50 transition-all">Send Message</button>
                    <a href={whatsappURL(selectedInquiry.product)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 bg-green-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-green-600 transition-all">
                      <MessageCircle size={18}/><span>WhatsApp</span>
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
    <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</h3>
        <div className="p-2.5 bg-gray-50 rounded-xl">{icon}</div>
      </div>
      <p className="text-3xl font-black text-gray-900">{value}</p>
    </div>
  );
}
