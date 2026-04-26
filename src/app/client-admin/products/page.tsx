"use client";

import React, { useState, useMemo } from 'react';
import { Plus, Search, Trash2, X, CheckCircle, ImageOff, Edit2, Save } from 'lucide-react';

type Product = { id: number; name: string; category: string; price: number; stock: number; status: string };

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: "Rose Zari Anarkali", category: "Suits", price: 12499, stock: 15, status: "Active" },
  { id: 2, name: "Ivory Silk Blouse", category: "Blouses", price: 4999, stock: 8, status: "Active" },
  { id: 3, name: "Charcoal Drape Dress", category: "Dresses", price: 8999, stock: 0, status: "Out of Stock" },
  { id: 4, name: "Blush Floral Lehenga", category: "Sets", price: 24500, stock: 3, status: "Low Stock" },
  { id: 5, name: "Royal Blue Salwar Suit", category: "Suits", price: 9999, stock: 6, status: "Active" },
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
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
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

  const getStatus = (stock: number) => stock === 0 ? 'Out of Stock' : stock <= 3 ? 'Low Stock' : 'Active';

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const stock = parseInt(fd.get('stock') as string);
    const price = parseInt(fd.get('price') as string);
    const name = fd.get('name') as string;
    const category = fd.get('category') as string;

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, name, price, stock, category, status: getStatus(stock) } : p));
      showToast(`"${name}" updated!`);
    } else {
      const newP: Product = { id: Date.now(), name, category, price, stock, status: getStatus(stock) };
      setProducts(prev => [newP, ...prev]);
      showToast(`"${name}" added!`);
    }
    
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const deleteProduct = (id: number, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(`"${name}" deleted.`);
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center space-x-2 bg-[#1C1C1C] text-white px-5 py-3 rounded-xl shadow-2xl animate-in slide-in-from-right">
          <CheckCircle size={18} className="text-[#E5C1CD]" /><span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-gray-900">Products Catalog <span className="text-sm text-gray-400 font-sans font-normal ml-2">({filtered.length} items)</span></h1>
        <button onClick={() => { setEditingProduct(null); setIsModalOpen(true); }} className="flex items-center space-x-2 bg-[#1C1C1C] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm">
          <Plus size={16} /><span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search products..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5C1CD]" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterCat === cat ? 'bg-[#1C1C1C] text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white border-2 border-dashed border-gray-100 rounded-2xl">
          <ImageOff size={48} className="mx-auto mb-3 opacity-10" />
          <p className="text-gray-400">No products match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group relative">
              <div className="h-44 flex items-center justify-center text-6xl bg-gradient-to-br from-gray-50 to-[#F9F7F1]">
                {CATEGORY_EMOJIS[p.category] ?? '🛍️'}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif font-bold text-gray-900 text-lg leading-tight group-hover:text-[#C5A1AD] transition-colors">{p.name}</h3>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-400 uppercase tracking-widest">{p.category}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[p.status] || 'bg-gray-100 text-gray-600'}`}>{p.status}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xl font-bold text-gray-900">₹{p.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-400">{p.stock} in stock</span>
                </div>
              </div>
              
              {/* Hover Actions */}
              <div className="absolute top-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => openEdit(p)} className="p-2 bg-white/90 backdrop-blur-sm shadow-md rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-all"><Edit2 size={14}/></button>
                 <button onClick={() => deleteProduct(p.id, p.name)} className="p-2 bg-white/90 backdrop-blur-sm shadow-md rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14}/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Tool */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-2xl font-serif">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Full Product Name</label>
                <input required name="name" defaultValue={editingProduct?.name} type="text" className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#E5C1CD] outline-none transition-all" placeholder="e.g. Silk Anarkali Suit" />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Price (₹)</label>
                  <input required name="price" defaultValue={editingProduct?.price} type="number" min="0" className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#E5C1CD] outline-none" placeholder="5000" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Current Stock</label>
                  <input required name="stock" defaultValue={editingProduct?.stock} type="number" min="0" className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#E5C1CD] outline-none" placeholder="10" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Selection Category</label>
                <select required name="category" defaultValue={editingProduct?.category || 'Suits'} className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#E5C1CD] bg-white">
                  <option>Blouses</option>
                  <option>Suits</option>
                  <option>Dresses</option>
                  <option>Sets</option>
                  <option>Frocks</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#1C1C1C] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-black transition-all flex items-center justify-center space-x-2">
                {editingProduct ? <><Save size={18}/><span>Update Product</span></> : <span>Save Collection Item</span>}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// Simple motion polyfill for brevity
const motion = {
  div: ({ children, initial, animate, className }: any) => <div className={className}>{children}</div>
};
