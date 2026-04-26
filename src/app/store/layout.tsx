import React from 'react';
import Link from 'next/link';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FFFFF0] text-[#333333] font-[family-name:var(--font-montserrat)] font-light">
      {/* Promotion Bar */}
      <div className="bg-[#333333] text-white text-center py-2 text-xs tracking-widest font-medium">
        FREE WORLDWIDE SHIPPING ON ORDERS OVER ₹15,000
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FFFFF0]/90 backdrop-blur-md border-b border-[#E5C1CD]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-24">
          <div className="flex-1">
            <nav className="hidden md:flex space-x-12 text-sm tracking-widest">
              <Link href="/store" className="hover:text-[#E5C1CD] transition-colors">NEW ARRIVALS</Link>
              <Link href="/store?category=Blouses" className="hover:text-[#E5C1CD] transition-colors">BLOUSES</Link>
              <Link href="/store?category=Suits" className="hover:text-[#E5C1CD] transition-colors">SUITS</Link>
              <Link href="/store?category=Dresses" className="hover:text-[#E5C1CD] transition-colors">DRESSES</Link>
            </nav>
          </div>
          
          <div className="flex-1 text-center font-[family-name:var(--font-playfair)]">
            <Link href="/store" className="text-4xl tracking-tight text-[#333333]">PRERNA SILKS</Link>
          </div>

          <div className="flex-1 flex justify-end space-x-6 text-sm tracking-widest">
            <Link href="/store" className="hover:text-[#E5C1CD] transition-colors">SEARCH</Link>
            <Link href="/store" className="hover:text-[#E5C1CD] transition-colors">CART (0)</Link>
          </div>
        </div>
      </header>

      {/* Store Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#333333] text-[#FFFFF0] py-20 mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl mb-6">Prerna Silks</h3>
            <p className="text-sm font-light leading-relaxed text-gray-300">
              Elegance tailored for the modern woman. Handcrafted designs powered by your Boutique SaaS Platform.
            </p>
          </div>
          <div>
            <h4 className="tracking-widest text-xs font-semibold mb-6 uppercase text-[#E5C1CD]">Client Support</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Size Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="tracking-widest text-xs font-semibold mb-6 uppercase text-[#E5C1CD]">Newsletter</h4>
            <p className="text-sm text-gray-300 mb-4">Join our list for early access to new collections.</p>
            <div className="flex border-b border-gray-500 pb-2">
              <input type="email" placeholder="Email Address" className="bg-transparent w-full focus:outline-none text-sm placeholder-gray-500" />
              <button className="text-xs tracking-widest font-medium hover:text-[#E5C1CD] transition-colors">SUBSCRIBE</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
