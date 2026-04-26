"use client";

import React, { useState } from 'react';
import { Grid, Plus, Trash2, X, Edit2, CheckCircle } from 'lucide-react';

const INITIAL_CATEGORIES = [
  { id: 1, name: 'Blouses', count: 12, icon: '👘' },
  { id: 2, name: 'Suits', count: 24, icon: '🥻' },
  { id: 3, name: 'Dresses', count: 18, icon: '👗' },
  { id: 4, name: 'Sets', count: 32, icon: '✨' },
];

export default function ClientCategoriesPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('🛍️');

  const addCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    setCategories([...categories, { id: Date.now(), name: newCatName, count: 0, icon: newCatIcon }]);
    setIsModalOpen(false);
    setNewCatName('');
  };

  const deleteCat = (id: number) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-1">Organize your products for easy browsing.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 bg-[#1C1C1C] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition shadow-sm">
          <Plus size={16} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between group hover:shadow-md transition-all">
            <div className="flex items-center space-x-4">
              <div className="text-4xl w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                {cat.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{cat.name}</h3>
                <p className="text-sm text-gray-400">{cat.count} Products</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Edit2 size={16}/></button>
               <button onClick={() => deleteCat(cat.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
               <h2 className="text-xl font-serif">Add Category</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400"><X size={20}/></button>
            </div>
            <form onSubmit={addCategory} className="p-6 space-y-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                  <input autoFocus value={newCatName} onChange={e => setNewCatName(e.target.value)} placeholder="e.g. Sarees" className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#E5C1CD]" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji)</label>
                  <input value={newCatIcon} onChange={e => setNewCatIcon(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#E5C1CD]" />
               </div>
               <button type="submit" className="w-full py-3 bg-[#1C1C1C] text-white rounded-lg font-medium hover:bg-black transition-colors mt-2">Create Category</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
