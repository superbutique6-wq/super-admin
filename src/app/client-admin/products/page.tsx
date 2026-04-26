"use client";

import React, { useState, useMemo } from 'react';
import { Plus, Search, Trash2, X, CheckCircle, ImageOff } from 'lucide-react';

type Product = { id: number; name: string; category: string; price: string; stock: number; status: string };

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: "Rose Zari Anarkali", category: "Suits", price: "₹12,499", stock: 15, status: "Active" },
  { id: 2, name: "Ivory Silk Blouse", category: "Blouses", price: "₹4,999", stock: 8, status: "Active" },
  { id: 3, name: "Charcoal Drape Dress", category: "Dresses", price: "₹8,999", stock: 0, status: "Out of Stock" },
  { id: 4, name: "Blush Floral Lehenga", category: "Sets", price: "₹24,500", stock: 3, status: "Low Stock" },
  { id: 5, name: "Royal Blue Salwar Suit", category: "Suits", price: "₹9,999", stock: 6, status: "Active" },
  { id: 6, name: "Golden Frock", category: "Dresses", price: "₹6,500", stock: 4, status: "Active" },
];

const STATUS_COLORS: Record<string, string> = {
  'Active': 'bg-green-100 text-green-700',
  'Out of Stock': 'bg-red-100 text-red-700',
  'Low Stock': 'bg-yellow-100 text-yellow-700',
};

const CATEGORY_EMOJIS: Record<string, string> = {
  Suits: '🥻', Blouses: '👘', Dresses: '👗', Sets: '✨', Frocks: '🎀',
};

export default function ClientProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [toast, setToast] = useState('');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filtered = useMemo(() =>
    products.filter(p =>
      (filterCat === 'All' || p.category === filterCat) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    ), [products, search, filterCat]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const stock = parseInt(fd.get('stock') as string);
    const newP: Product = {
      id: Date.now(),
      name: fd.get('name') as string,
      category: fd.get('category') as string,
      price: `₹${fd.get('price')}`,
      stock,
      status: stock === 0 ? 'Out of Stock' : stock <= 3 ? 'Low Stock' : 'Active',
    };
    setProducts(prev => [newP, ...prev]);
    setIsModalOpen(false);
    showToast(`"${newP.name}" added successfully!`);
    e.currentTarget.reset();
  };

  const deleteProduct = (id: number, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(`"${name}" deleted.`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center space-x-2 bg-green-600 text-white px-5 py-3 rounded-xl shadow-2xl animate-in slide-in-from-right">
          <CheckCircle size={18} /><span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-gray-900">Products Catalog <span className="text-sm text-gray-400 font-sans font-normal">({filtered.length} items)</span></h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 bg-[#1C1C1C] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm">
          <Plus size={16} /><span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search by name..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5C1CD]" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterCat === cat ? 'bg-[#1C1C1C] text-white' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <ImageOff size={48} className="mx-auto mb-3 opacity-30" />
          <p>No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              {/* Product colour swatch instead of broken image */}
              <div className="h-40 flex items-center justify-center text-6xl" style={{ background: 'linear-gradient(135deg, #f9f7f1, #f0e0e8)' }}>
                {CATEGORY_EMOJIS[p.category] ?? '🛍️'}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif font-semibold text-gray-900 text-lg leading-tight">{p.name}</h3>
                  <button onClick={() => deleteProduct(p.id, p.name)} className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100" title="Delete product">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{p.category}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${STATUS_COLORS[p.status] || 'bg-gray-100 text-gray-600'}`}>{p.status}</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="font-bold text-gray-900">{p.price}</span>
                  <span className="text-xs text-gray-400">{p.stock} in stock</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-serif">Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddProduct} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input required name="name" type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#E5C1CD] focus:border-[#E5C1CD] outline-none" placeholder="e.g. Silk Anarkali Suit" />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input required name="price" type="number" min="0" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#E5C1CD] focus:border-[#E5C1CD] outline-none" placeholder="5000" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Qty</label>
                  <input required name="stock" type="number" min="0" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#E5C1CD] focus:border-[#E5C1CD] outline-none" placeholder="10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select required name="category" className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-[#E5C1CD] focus:border-[#E5C1CD]">
                  <option>Blouses</option>
                  <option>Suits</option>
                  <option>Dresses</option>
                  <option>Sets</option>
                  <option>Frocks</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#1C1C1C] text-white py-3 rounded-lg font-medium hover:bg-black transition-colors mt-2">
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
