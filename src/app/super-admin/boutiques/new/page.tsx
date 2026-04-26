"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Wand2, CheckCircle, Copy } from 'lucide-react';

export default function ProvisionBoutique() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ name: string; id: string; email: string } | null>(null);
  const [boutiqueName, setBoutiqueName] = useState('');
  const [boutiqueId, setBoutiqueId] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [copied, setCopied] = useState('');

  // Auto-generate slug from name
  const handleNameChange = (val: string) => {
    setBoutiqueName(val);
    setBoutiqueId(val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess({ name: boutiqueName, id: boutiqueId, email: ownerEmail });
    }, 2000);
  };

  if (success) {
    const loginUrl = `https://butique-owner-pannel.vercel.app/client-admin`;
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-serif text-gray-900 mb-3">Boutique Deployed! 🎉</h2>
          <p className="text-gray-500 mb-8">
            <strong className="text-gray-800">{success.name}</strong> is now live. Credentials have been sent to <strong className="text-gray-800">{success.email}</strong>.
          </p>

          <div className="text-left space-y-4 mb-8">
            <InfoRow label="Boutique ID" value={success.id} onCopy={() => copyToClipboard(success.id, 'id')} copied={copied === 'id'} />
            <InfoRow label="Owner Login URL" value={loginUrl} onCopy={() => copyToClipboard(loginUrl, 'url')} copied={copied === 'url'} />
            <InfoRow label="Store URL" value={`https://butique-site.vercel.app/store`} onCopy={() => copyToClipboard(`https://butique-site.vercel.app/store`, 'store')} copied={copied === 'store'} />
          </div>

          <div className="flex space-x-4">
            <Link href="/super-admin/boutiques" className="flex-1 text-center py-3 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
              View All Boutiques
            </Link>
            <button onClick={() => { setSuccess(null); setBoutiqueName(''); setBoutiqueId(''); setOwnerEmail(''); }} className="flex-1 py-3 bg-[#1C1C1C] text-white rounded-xl text-sm font-medium hover:bg-black transition">
              Provision Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/super-admin" className="inline-flex items-center space-x-2 text-gray-500 hover:text-[#333333] mb-8 transition-colors">
        <ArrowLeft size={20} /><span>Back to Dashboard</span>
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
                type="text" required value={boutiqueName}
                onChange={e => handleNameChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E5C1CD] transition-all"
                placeholder="e.g., Elegance India"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Auto-Generated ID</label>
              <input
                type="text" value={boutiqueId} readOnly
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 font-mono text-sm"
                placeholder="auto-generated..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Owner's Email Address</label>
            <input
              type="email" required value={ownerEmail}
              onChange={e => setOwnerEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E5C1CD] transition-all"
              placeholder="owner@elegance.com"
            />
            <p className="text-xs text-gray-400 mt-2">We will send the sub-admin login credentials to this email.</p>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <button
              type="submit" disabled={loading || !boutiqueName || !ownerEmail}
              className={`w-full flex justify-center items-center space-x-2 bg-[#333333] text-white py-4 rounded-xl font-medium hover:bg-black transition-colors ${loading || !boutiqueName ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <><span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"/>Provisioning Environment...</>
              ) : 'Deploy Boutique'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InfoRow({ label, value, onCopy, copied }: { label: string; value: string; onCopy: () => void; copied: boolean }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-mono text-gray-800 break-all">{value}</p>
      </div>
      <button onClick={onCopy} className="ml-3 shrink-0 text-gray-400 hover:text-gray-700 transition-colors">
        {copied ? <CheckCircle size={18} className="text-green-500" /> : <Copy size={18} />}
      </button>
    </div>
  );
}
