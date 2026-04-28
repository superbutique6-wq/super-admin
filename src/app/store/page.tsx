"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, MessageCircle, X, ShoppingBag, ArrowUpRight, PlayCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const PRODUCTS = [
  { id: 1, name: "Rose Zari Anarkali", category: "Suits", price: "₹12,499", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=2546&auto=format&fit=crop", description: "A masterpiece of craftsmanship, this Rose Zari Anarkali features hand-embroidered floral motifs and delicate gold thread work." },
  { id: 2, name: "Ivory Silk Blouse", category: "Blouses", price: "₹4,999", image: "https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?q=80&w=2602&auto=format&fit=crop", description: "Timeless ivory silk blouse with a modern neckline, perfect for pairing with any statement saree or lehenga." },
  { id: 3, name: "Charcoal Drape Dress", category: "Dresses", price: "₹8,999", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=2574&auto=format&fit=crop", description: "Contemporary drape dress in charcoal grey, offering a fluid silhouette and effortless elegance for evening soirees." },
  { id: 4, name: "Blush Floral Lehenga", category: "Sets", price: "₹24,500", image: "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?q=80&w=2574&auto=format&fit=crop", description: "A romantic blush lehenga with intricate floral beadwork and a soft tulle dupatta for a fairytale wedding look." },
  { id: 5, name: "Sunset Gold Saree", category: "Sets", price: "₹18,200", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=2574&auto=format&fit=crop", description: "Glowing sunset gold hand-loomed saree that catches every ray of light. A celebration of traditional Indian textiles." },
  { id: 6, name: "Midnight Velvet Kaftan", category: "Dresses", price: "₹10,500", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=2574&auto=format&fit=crop", description: "Luxurious midnight blue velvet kaftan with metallic embroidery, blending comfort with opulent style." },
];

const NEW_ARRIVALS = [
  { id: 101, name: "Silk Dust Saree", image: "https://images.unsplash.com/photo-1621112904887-419379ce6824?q=80&w=2672&auto=format&fit=crop" },
  { id: 102, name: "Golden Bloom", image: "https://images.unsplash.com/photo-1583391733975-d419379ce682?q=80&w=2572&auto=format&fit=crop" },
  { id: 103, name: "Velvet Night", image: "https://images.unsplash.com/photo-1610030469983-98e550d61dc5?q=80&w=2574&auto=format&fit=crop" },
  { id: 104, name: "Rose Petal", image: "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?q=80&w=2574&auto=format&fit=crop" },
];

// Magnetic Parallax Wrapper Component
const MagneticParallax = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.1);
    y.set((e.clientY - centerY) * 0.1);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

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
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="bg-[#FDFDFA] selection:bg-accent selection:text-white">
      
      {/* Editorial Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1610030469983-98e550d61dc5?q=80&w=2574&auto=format&fit=crop" 
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] tracking-[0.5em] font-bold uppercase text-white/70 mb-8">Established in 2026</span>
            <div className="overflow-hidden mb-6">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-6xl md:text-[8rem] text-white leading-none tracking-tight uppercase"
              >
                Timeless<span className="font-light italic text-accent">.</span>
              </motion.h1>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="text-[#FDFDFA]/80 font-light text-sm md:text-lg tracking-[0.2em] uppercase max-w-lg mx-auto mb-12"
            >
              Handcrafted silk garments meticulously tailored for the modern silhouette.
            </motion.p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-[#FDFDFA] text-[#121212] text-[10px] tracking-[0.4em] font-bold uppercase hover:bg-accent hover:text-white transition-all duration-700"
            >
              Discover Collection
            </motion.button>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-[10px] tracking-widest uppercase font-bold"
        >
          Scroll to explore
        </motion.div>
      </section>

      {/* Narrative Section - The Craft */}
      <section className="py-40 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="aspect-[4/5] bg-gray-100 overflow-hidden relative group"
          >
            <img 
              src="https://images.unsplash.com/photo-1621112904887-419379ce6824?q=80&w=2672&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              alt="Craftsmanship"
            />
            <div className="absolute inset-0 border-[20px] border-white/20 pointer-events-none" />
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h2 className="font-serif text-4xl md:text-6xl text-[#121212] mb-8 leading-tight">
                The Art of <br/> Permanent <span className="italic font-light">Elegance</span>
              </h2>
              <p className="text-lg text-muted font-light leading-relaxed max-w-md">
                We believe in the slow craft. Every yard of silk is hand-touched, every embroidery planned with precision. It is not just fashion; it is a legacy.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-6 group cursor-pointer"
            >
              <div className="w-16 h-[1px] bg-accent group-hover:w-24 transition-all duration-700" />
              <span className="text-[10px] tracking-[0.4em] font-bold uppercase group-hover:text-accent transition-colors">Learn Our Story</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Horizontal Arrivals Reel */}
      <section className="bg-[#121212] py-40 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 mb-20 flex justify-between items-end">
          <h2 className="font-serif text-5xl md:text-7xl text-[#FDFDFA]">New Arrivals</h2>
          <div className="hidden md:flex space-x-4">
             <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:border-white hover:text-white transition-all cursor-pointer">
                <ArrowRight className="rotate-180" size={18} />
             </div>
             <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:border-white hover:text-white transition-all cursor-pointer">
                <ArrowRight size={18} />
             </div>
          </div>
        </div>
        
        <div className="flex overflow-x-auto gap-10 px-6 md:px-0 scrollbar-hide pb-10">
          {NEW_ARRIVALS.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[300px] md:min-w-[500px] aspect-[4/5] relative group cursor-pointer"
            >
              <div className="w-full h-full overflow-hidden bg-gray-900">
                <img 
                  src={item.image} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                  alt={item.name}
                />
              </div>
              <div className="absolute bottom-10 left-10 text-[#FDFDFA]">
                <span className="text-[10px] tracking-[0.4em] font-bold uppercase opacity-60 mb-2 block">Edition 2026</span>
                <h3 className="font-serif text-3xl tracking-wide uppercase">{item.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Product Grid - Masonry Style */}
      <section id="products" className="py-40 px-6 lg:px-20 bg-[#FDFDFA]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 border-b border-black/5 pb-12">
            <div>
              <span className="text-[10px] font-bold tracking-[0.5em] text-accent uppercase mb-6 block">Collection Archetypes</span>
              <h2 className="text-5xl md:text-7xl font-serif text-[#121212]">
                {activeCategory === 'All' ? 'The Masterpieces' : activeCategory}
              </h2>
            </div>
            <nav className="flex space-x-12 mt-12 md:mt-0 text-[10px] tracking-[0.4em] font-bold uppercase text-[#121212]/30">
              {['All', 'Suits', 'Blouses', 'Dresses'].map(cat => (
                <Link 
                  key={cat}
                  href={`/store?category=${cat}`}
                  className={`hover:text-accent transition-colors pb-4 relative ${activeCategory === cat ? 'text-accent' : ''}`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div layoutId="activeCat" className="absolute bottom-0 left-0 w-full h-[1px] bg-accent" />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-12 gap-y-32">
            {filteredProducts.map((product, idx) => {
              // Irregular Masonry Spans
              const spans = [
                "lg:col-span-7", 
                "lg:col-span-5 md:mt-40", 
                "lg:col-span-5 mk-80", 
                "lg:col-span-12 h-[80vh]",
                "lg:col-span-6",
                "lg:col-span-6 md:mt-20"
              ];
              const span = spans[idx % spans.length];

              return (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, filter: "blur(10px)", y: 50 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: "circOut" }}
                  className={`${span} group cursor-pointer`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <MagneticParallax className="relative aspect-[3/4] md:aspect-auto md:h-full overflow-hidden bg-gray-50 mb-10 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                     <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
                     <div className="absolute top-10 right-10 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-xl">
                        <ArrowUpRight size={18} />
                     </div>
                  </MagneticParallax>
                  
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-serif text-[#121212] group-hover:text-accent transition-colors duration-500 uppercase tracking-widest leading-none">
                        {product.name}
                      </h3>
                      <span className="text-[10px] tracking-[0.4em] font-bold uppercase text-muted block">{product.category}</span>
                    </div>
                    <span className="text-sm tracking-[0.2em] font-semibold text-[#121212]">{product.price}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
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
              className="absolute inset-0 bg-[#121212]/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative bg-white w-full max-w-6xl h-fit max-h-[90vh] overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-sm z-[200]"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-8 right-8 z-10 p-3 bg-white/20 hover:bg-white text-gray-900 rounded-full transition-all border border-black/5"
              >
                <X size={24} />
              </button>
              
              <div className="h-[40vh] md:h-[80vh] bg-gray-100 overflow-hidden">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-10 md:p-20 flex flex-col justify-center bg-white">
                <div className="mb-12">
                  <span className="text-[10px] font-bold tracking-[0.5em] text-accent uppercase mb-6 block">{selectedProduct.category}</span>
                  <h2 className="text-4xl md:text-6xl font-serif text-[#121212] mb-6 leading-none uppercase">{selectedProduct.name}</h2>
                  <p className="text-3xl text-[#121212] font-light italic mb-8">{selectedProduct.price}</p>
                </div>
                
                <p className="text-[#121212]/60 leading-relaxed mb-16 text-lg font-light">
                  {selectedProduct.description}
                </p>
                
                <div className="flex flex-col gap-4">
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://wa.me/919876543210?text=I'm%20interested%20in%20${encodeURIComponent(selectedProduct.name)}`}
                    target="_blank"
                    className="w-full py-6 bg-[#121212] text-[#FDFDFA] flex items-center justify-center space-x-4 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-accent transition-all duration-700 shadow-xl"
                  >
                    <MessageCircle size={18} />
                    <span>Inquire via Boutique Concierge</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Magnetic Floating WhatsApp Button */}
      <MagneticParallax className="fixed bottom-10 right-10 z-[80]">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://wa.me/919876543210"
          target="_blank"
          className="flex items-center bg-accent text-[#FDFDFA] p-5 rounded-full shadow-[0_0_40px_rgba(197,161,173,0.4)] transition-all group overflow-hidden"
        >
          <MessageCircle size={28} />
          <motion.span 
            initial={{ width: 0, opacity: 0 }}
            whileHover={{ width: "auto", opacity: 1 }}
            className="text-[10px] tracking-[0.3em] font-bold uppercase ml-0 group-hover:ml-4 whitespace-nowrap overflow-hidden transition-all duration-500"
          >
            Chat with Atelier
          </motion.span>
        </motion.a>
      </MagneticParallax>
    </div>
  );
}
