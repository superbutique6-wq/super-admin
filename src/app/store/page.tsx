"use client";

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function StorefrontHome() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
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
              clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" // Dynamic angular cut
            }} />
          </motion.div>
        </motion.div>
      </section>

      {/* Narrative Section - SaaS Level addition */}
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

      {/* Studio Collections - Overlapping Cards */}
      <section className="py-32 max-w-7xl mx-auto px-6 lg:px-12 bg-white relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-end mb-20"
        >
          <h3 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] text-[#333333]">The Edit</h3>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Main Large Card */}
          <Link href="#" className="group relative flex-1 h-[700px] cursor-pointer overflow-hidden rounded-[2rem]">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 bg-neutral-200" style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2583&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500" />
            <div className="absolute bottom-12 left-10 text-white z-10 w-2/3">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs tracking-widest uppercase mb-4">Trending</span>
              <h4 className="text-4xl font-[family-name:var(--font-playfair)] mb-2 group-hover:-translate-y-2 transition-transform duration-300">Signature Suits</h4>
              <p className="font-light text-gray-200">The epitome of effortless grace.</p>
            </div>
          </Link>

          {/* Stacked View */}
          <div className="flex-1 flex flex-col gap-8">
            <Link href="#" className="group relative flex-1 h-[330px] cursor-pointer overflow-hidden rounded-[2rem]">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-0 bg-neutral-200" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1583391733958-650fac5b1368?q=80&w=2574&auto=format&fit=crop')",
                backgroundSize: "cover",
                backgroundPosition: "top"
              }} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute bottom-8 left-8 text-white z-10">
                <h4 className="text-3xl font-[family-name:var(--font-playfair)] mb-1">Blouses</h4>
                <p className="text-xs tracking-widest uppercase opacity-80">Explore</p>
              </div>
            </Link>
            
            <div className="flex-1 bg-[#F9F7F1] rounded-[2rem] p-10 flex flex-col justify-center border border-[#E5C1CD]/30">
               <h4 className="text-2xl font-[family-name:var(--font-playfair)] text-[#333333] mb-4">Bespoke Fitting</h4>
               <p className="text-sm text-gray-500 font-light mb-6">Need a custom measurement? Speak directly to our master tailors.</p>
               <button className="self-start text-xs font-bold uppercase tracking-widest bg-[#333333] text-white px-6 py-3 rounded-full hover:bg-[#E5C1CD] hover:text-[#333333] transition-colors">
                 Talk to Designer
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Infinite Scroll / Product Display */}
      <section className="bg-[#333333] text-white py-32 rounded-t-[3rem] relative z-20 mt-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-16"
          >
            <h3 className="text-4xl font-[family-name:var(--font-playfair)]">Latest Additions</h3>
            <Link href="#" className="text-xs tracking-widest uppercase border-b border-gray-600 hover:text-white hover:border-white transition-colors pb-1">
              Shop All
            </Link>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatedProductCard name="Rose Zari Anarkali" price="₹12,499" image="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=2546&auto=format&fit=crop" vars={item} />
            <AnimatedProductCard name="Ivory Silk Blouse" price="₹4,999" image="https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?q=80&w=2602&auto=format&fit=crop" vars={item} />
            <AnimatedProductCard name="Charcoal Drape Dress" price="₹8,999" image="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=2574&auto=format&fit=crop" vars={item} />
            <AnimatedProductCard name="Blush Floral Lehenga" price="₹24,500" image="https://images.unsplash.com/photo-1617922001439-4a2e6562f328?q=80&w=2574&auto=format&fit=crop" vars={item} />
          </motion.div>
        </div>
      </section>

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

function AnimatedProductCard({ name, price, image, vars }: { name: string, price: string, image: string, vars: any }) {
  return (
    <motion.div variants={vars} className="group cursor-pointer flex flex-col">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-800 mb-6 rounded-2xl">
        <motion.div 
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('${image}')` }}
        />
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <button className="w-full bg-white text-[#333333] py-3 text-xs tracking-widest font-bold uppercase rounded-xl hover:bg-[#E5C1CD] transition-colors shadow-xl">
            Quick Add
          </button>
        </div>
      </div>
      <div>
        <h5 className="font-[family-name:var(--font-playfair)] text-xl mb-1">{name}</h5>
        <p className="text-sm font-light text-gray-400">{price}</p>
      </div>
    </motion.div>
  );
}
