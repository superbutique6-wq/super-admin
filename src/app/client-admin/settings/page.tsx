"use client";

import React, { useState } from 'react';

export default function StoreSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [storeName, setStoreName] = useState("Prerna Silks");
  const [tagline, setTagline] = useState("Handcrafted elegance for the modern woman.");
  const [whatsapp, setWhatsapp] = useState("+91 98765 43210");
  const [primaryColor, setPrimaryColor] = useState("#E5C1CD");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-gray-900">Store Settings</h1>
        <p className="text-gray-500 mt-1">Customize your boutique's branding and contact details.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Branding */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-100">Branding</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Boutique Name</label>
              <input
                value={storeName}
                onChange={e => setStoreName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#E5C1CD]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input
                value={tagline}
                onChange={e => setTagline(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#E5C1CD]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Color</label>
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={e => setPrimaryColor(e.target.value)}
                  className="w-12 h-12 rounded-lg cursor-pointer border border-gray-300"
                />
                <span className="text-sm text-gray-500 font-mono">{primaryColor}</span>
                <div className="w-10 h-10 rounded-full border border-gray-200 shadow" style={{ backgroundColor: primaryColor }} />
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-100">Contact & Support</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number (for "Talk to Designer")</label>
              <input
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#E5C1CD]"
                placeholder="+91 XXXXX XXXXX"
              />
              <p className="text-xs text-gray-400 mt-1">Customers will be connected directly to this number.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="bg-[#1C1C1C] text-white px-8 py-3 rounded-lg font-medium hover:bg-black transition-colors"
          >
            Save Settings
          </button>
          {saved && (
            <span className="text-green-600 text-sm font-medium animate-pulse">✓ Settings Saved!</span>
          )}
        </div>
      </form>
    </div>
  );
}
