"use client";

import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Image as ImageIcon, X } from 'lucide-react';

export default function ClientProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: "Rose Zari Anarkali", category: "Suits", price: "₹12,499", stock: 15, status: "Active", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=2546&auto=format&fit=crop" },
    { id: 2, name: "Ivory Silk Blouse", category: "Blouses", price: "₹4,999", stock: 8, status: "Active", image: "https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?q=80&w=2602&auto=format&fit=crop" },
    { id: 3, name: "Charcoal Drape Dress", category: "Dresses", price: "₹8,999", stock: 0, status: "Out of Stock", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=2574&auto=format&fit=crop" },
    { id: 4, name: "Blush Floral Lehenga", category: "Sets", price: "₹24,500", stock: 3, status: "Low Stock", image: "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?q=80&w=2574&auto=format&fit=crop" }
  ]);

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProduct = {
      id: Date.now(),
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      price: `₹${formData.get('price')}`,
      stock: parseInt(formData.get('stock') as string),
      status: "Active",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2583&auto=format&fit=crop" // Mock image
    };
    setProducts([newProduct, ...products]);
    setIsModalOpen(false);
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-gray-900">Products Catalog</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-[#1C1C1C] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm"
        >
          <Plus size={16} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5C1CD]"
            />
          </div>
          <button className="flex items-center space-x-2 text-sm text-gray-600 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Inventory</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(p => (
                <ProductRow key={p.id} {...p} onDelete={() => deleteProduct(p.id)} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-serif">Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input required name="name" type="text" className="w-full border-gray-300 border rounded-lg p-2 focus:ring-[#E5C1CD] focus:border-[#E5C1CD] outline-none" placeholder="e.g. Silk Saree" />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input required name="price" type="number" className="w-full border-gray-300 border rounded-lg p-2 focus:ring-[#E5C1CD] focus:border-[#E5C1CD] outline-none" placeholder="e.g. 5000" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input required name="stock" type="number" className="w-full border-gray-300 border rounded-lg p-2 focus:ring-[#E5C1CD] focus:border-[#E5C1CD] outline-none" placeholder="e.g. 10" />
                </div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                 <select required name="category" className="w-full border-gray-300 border rounded-lg p-2 outline-none">
                    <option>Blouses</option>
                    <option>Suits</option>
                    <option>Dresses</option>
                 </select>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-[#1C1C1C] text-white py-3 rounded-lg font-medium hover:bg-black transition-colors">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductRow({ name, category, price, stock, status, image, onDelete }: { name: string, category: string, price: string, stock: number, status: string, image: string, onDelete: () => void }) {
  const statusColors = {
    'Active': 'bg-green-100 text-green-700',
    'Out of Stock': 'bg-red-100 text-red-700',
    'Low Stock': 'bg-yellow-100 text-yellow-700'
  }[status as string] || 'bg-gray-100 text-gray-700';

  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="py-4 px-6 relative flex items-center space-x-4">
        {image ? (
          <img src={image} alt={name} className="w-12 h-16 object-cover rounded shadow-sm" />
        ) : (
          <div className="w-12 h-16 bg-gray-100 rounded flex items-center justify-center text-gray-400"><ImageIcon size={20} /></div>
        )}
        <span className="font-medium text-gray-900">{name}</span>
      </td>
      <td className="py-4 px-6 text-gray-500">{category}</td>
      <td className="py-4 px-6 font-medium text-gray-900">{price}</td>
      <td className="py-4 px-6">
        <div>
          <span className="text-gray-900 font-medium">{stock} in stock</span>
          <br />
          <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${statusColors}`}>
            {status}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 text-right">
        <button className="text-gray-400 hover:text-gray-600 transition-colors relative group/menu" onClick={onDelete}>
          <span className="text-xs text-red-500 opacity-0 group-hover/menu:opacity-100 transition-opacity">Delete</span>
        </button>
      </td>
    </tr>
  );
}
