"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageCircle, X, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const PRODUCTS = [
  { id: 1, name: "Rose Zari Anarkali", category: "Suits", price: "₹12,499", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=2546&auto=format&fit=crop", description: "A masterpiece of craftsmanship, this Rose Zari Anarkali features hand-embroidered floral motifs and delicate gold thread work." },
  { id: 2, name: "Ivory Silk Blouse", category: "Blouses", price: "₹4,999", image: "https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?q=80&w=2602&auto=format&fit=crop", description: "Timeless ivory silk blouse with a modern neckline, perfect for pairing with any statement saree or lehenga." },
  { id: 3, name: "Charcoal Drape Dress", category: "Dresses", price: "₹8,999", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=2574&auto=format&fit=crop", description: "Contemporary drape dress in charcoal grey, offering a fluid silhouette and effortless elegance for evening soirees." },
  { id: 4, name: "Blush Floral Lehenga", category: "Sets", price: "₹24,500", image: "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?q=80&w=2574&auto=format&fit=crop", description: "A romantic blush lehenga with intricate floral beadwork and a soft tulle dupatta for a fairytale wedding look." },
  { id: 5, name: "Sunset Gold Saree", category: "Sets", price: "₹18,200", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=2574&auto=format&fit=crop", description: "Glowing sunset gold hand-loomed saree that catches every ray of light. A celebration of traditional Indian textiles." },
  { id: 6, name: "Midnight Velvet Kaftan", category: "Dresses", price: "₹10,500", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=2574&auto=format&fit=crop", description: "Luxurious midnight blue velvet kaftan with metallic embroidery, blending comfort with opulent style." },
];

export default function StorefrontHome() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProducts(PRODUCTS);
    } else {
      setFilteredProducts(PRODUCTS.filter(p => p.category.toUpperCase() === activeCategory.toUpperCase()));
    }
  }, [activeCategory]);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  
  // Stagger variants for the product grid
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 20 } }
  };

  return (
    <div className="overflow-hidden bg-[#FFFFF0]">
      {/* Dynamic Split Screen Hero - Ultra Professional */}
      <section className="relative h-[90vh] flex flex-col md:flex-row overflow-hidden border-b border-[#E5C1CD]/30">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex-1 flex flex-col justify-center px-8 md:px-20 lg:px-32 z-10 bg-[#FFFFF0]"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "anticipate" }}
            className="h-[2px] w-20 bg-[#E5C1CD] origin-left mb-8"
          />
          <h2 className="text-6xl md:text-8xl font-[family-name:var(--font-playfair)] text-[#333333] leading-[1.1] mb-6">
            Timeless <br className="hidden md:block"/> Elegance
          </h2>
          <p className="text-lg text-gray-500 font-light mb-12 max-w-md">
            Discover our meticulously handcrafted collection of luxury ethnic wear, designed for the modern muse.
          </p>
          <div className="flex items-center space-x-6">
            <a 
              href="#products"
              onClick={e => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="group relative inline-flex items-center space-x-4 border-b-2 border-[#333333] pb-2 overflow-hidden cursor-pointer"
            >
               <span className="text-sm font-semibold tracking-widest uppercase text-[#333333] group-hover:text-[#E5C1CD] transition-colors duration-300">
                 Shop the Collection
               </span>
               <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform duration-300 text-[#333333] group-hover:text-[#E5C1CD]" />
            </a>
          </div>
        </motion.div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="flex-1 relative hidden md:block"
        >
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <div className="w-full h-full object-cover shadow-2xl" style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1610030469983-98e550d61dc5?q=80&w=2574&auto=format&fit=crop')",
              backgroundPosition: "center 20%",
              backgroundSize: "cover",
              clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)"
            }} />
          </motion.div>
        </motion.div>
      </section>

      {/* Narrative Section */}
      <section className="py-32 bg-[#F9F7F1] relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="text-2xl md:text-4xl font-[family-name:var(--font-playfair)] leading-relaxed text-[#333333]"
            >
              "We believe that true beauty lies in the meticulous details. Every thread, every bead, and every cut is a testament to our dedication to the craft of luxury."
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-8 text-sm uppercase tracking-widest text-[#E5C1CD] font-bold"
            >
              - Our Philosophy
            </motion.p>
        </div>
      </section>

      {/* Main Grid Section */}
      <section id="products" className="py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-bold tracking-[0.3em] text-[#E5C1CD] uppercase mb-4 block">Our Collection</span>
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] text-[#333333]">
                {activeCategory === 'All' ? 'Featured Masterpieces' : activeCategory}
              </h2>
            </div>
            <div className="flex space-x-8 text-sm tracking-widest font-medium text-gray-400">
              {['All', 'Suits', 'Blouses', 'Dresses', 'Sets'].map(cat => (
                <Link 
                  key={cat}
                  href={`/store?category=${cat}`}
                  className={`hover:text-[#333333] transition-colors pb-1 border-b-2 ${activeCategory === cat ? 'border-[#E5C1CD] text-[#333333]' : 'border-transparent'}`}
                >
                  {cat.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20"
          >
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                variants={item}
                className="group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-6 rounded-sm shadow-sm group-hover:shadow-xl transition-all duration-500">
                   <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                   <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/90 backdrop-blur-sm flex justify-between items-center">
                      <span className="text-xs font-bold tracking-widest uppercase">View Details</span>
                      <ShoppingBag size={16} />
                   </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-[family-name:var(--font-playfair)] text-[#333333] group-hover:text-[#C5A1AD] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center text-xs tracking-widest uppercase text-gray-400">
                    <span>{product.category}</span>
                    <span className="font-medium text-[#333333]">{product.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-5xl h-fit max-h-[90vh] overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-sm"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/90 hover:bg-white text-gray-900 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="h-[40vh] md:h-[70vh] bg-gray-100 overflow-hidden">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8 md:p-12 flex flex-col justify-center bg-[#F9F7F1]/30">
                <span className="text-xs font-bold tracking-[0.4em] text-[#E5C1CD] uppercase mb-4 block">{selectedProduct.category}</span>
                <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] text-[#333333] mb-6">{selectedProduct.name}</h2>
                <p className="text-2xl text-[#333333] mb-8 font-light italic">{selectedProduct.price}</p>
                
                <p className="text-gray-600 leading-relaxed mb-10 text-lg">
                  {selectedProduct.description}
                </p>
                
                <div className="space-y-4">
                  <a 
                    href={`https://wa.me/919876543210?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(selectedProduct.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-5 bg-[#1C1C1C] text-white flex items-center justify-center space-x-3 text-sm font-bold tracking-widest uppercase hover:bg-black transition-all"
                  >
                    <MessageCircle size={20} />
                    <span>Talk to Designer</span>
                  </a>
                  <button 
                    onClick={() => {
                      alert("Sharing feature coming soon!");
                    }}
                    className="w-full py-5 border border-gray-200 text-[#333333] flex items-center justify-center space-x-3 text-sm font-bold tracking-widest uppercase hover:bg-gray-50 transition-all"
                  >
                    <ArrowUpRight size={20} />
                    <span>Share Details</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919876543210?text=Hi!%20I%20saw%20your%20boutique%20and%20would%20like%20to%20know%20more."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-2xl transition-all hover:scale-105"
      >
        <MessageCircle size={22} />
        <span className="text-sm font-semibold">Talk to Designer</span>
      </a>
    </div>
  );
}
