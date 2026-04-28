import React from 'react';
import Link from 'next/link';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FDFDFA] text-[#121212] font-sans font-light">
      {/* Editorial Promotion Bar */}
      <div className="bg-[#121212] text-[#FDFDFA] text-center py-3 text-[10px] tracking-[0.4em] font-medium uppercase">
        <span className="opacity-80">Complimentary Worldwide Shipping on All Orders Over ₹15,000</span>
      </div>

      {/* Luxury Header */}
      <header className="sticky top-0 z-50 glass border-b border-black/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex justify-between items-center h-20 md:h-28">
          <div className="hidden lg:flex flex-1">
            <nav className="flex space-x-10 text-[11px] tracking-[0.3em] font-medium uppercase">
              <Link href="/store" className="hover:text-accent transition-colors duration-500">New Arrivals</Link>
              <Link href="/store?category=Suits" className="hover:text-accent transition-colors duration-500">Suits</Link>
              <Link href="/store?category=Dresses" className="hover:text-accent transition-colors duration-500">Dresses</Link>
            </nav>
          </div>
          
          <div className="flex-1 text-center font-serif">
            <Link href="/store" className="text-2xl md:text-4xl tracking-[0.2em] text-[#121212] font-semibold uppercase">
              PRERNA <span className="font-light italic">Silks</span>
            </Link>
          </div>

          <div className="flex-1 flex justify-end items-center space-x-6 md:space-x-10 text-[11px] tracking-[0.3em] font-bold uppercase text-accent">
             <Link href="#products" className="hover:text-[#121212] transition-colors duration-500">
               Atelier Inquiry
             </Link>
          </div>
        </div>
      </header>

      {/* Store Content */}
      <main className="relative">
        {children}
      </main>

      {/* Editorial Footer */}
      <footer className="bg-[#121212] text-[#FDFDFA] pt-32 pb-20 mt-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
            <div className="md:col-span-2">
              <h3 className="font-serif text-3xl md:text-5xl mb-8 tracking-wide">Prerna Silks</h3>
              <p className="text-sm md:text-lg font-light leading-relaxed text-[#FDFDFA]/60 max-w-md">
                Dedicated to the preservation of heritage and the pursuit of modern elegance. Each piece is a story told in silk.
              </p>
            </div>
            
            <div>
              <h4 className="tracking-[0.3em] text-[10px] font-bold mb-10 uppercase text-accent">Studio</h4>
              <ul className="space-y-6 text-xs tracking-widest text-[#FDFDFA]/60">
                <li><Link href="#" className="hover:text-white transition-colors duration-500">Our Story</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-500">Artisanal Craft</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-500">Sustainability</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="tracking-[0.3em] text-[10px] font-bold mb-10 uppercase text-accent">Concierge</h4>
              <ul className="space-y-6 text-xs tracking-widest text-[#FDFDFA]/60">
                <li><Link href="#" className="hover:text-white transition-colors duration-500">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-500">Bespoke Fitting</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-500">Care Guide</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] tracking-[0.2em] font-medium text-[#FDFDFA]/40 uppercase">
              © 2026 PRERNA SILKS. All Rights Reserved.
            </p>
            <div className="flex space-x-8 text-[10px] tracking-[0.2em] font-medium text-[#FDFDFA]/40 uppercase">
              <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
              <Link href="#" className="hover:text-white transition-colors">Pinterest</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
