// app/components/Footer.jsx
'use client';

import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          
          {/* Footer Links */}
          <nav className="flex space-x-6">
            <Link href="/about" className="text-sm hover:text-white transition-colors duration-300">
              About
            </Link>
            <Link href="/contact" className="text-sm hover:text-white transition-colors duration-300">
              Contact
            </Link>
          </nav>

          {/* Social Media Icons */}
          <div className="flex space-x-5">
            
            {/* Instagram */}
            <Link href="https://www.instagram.com/abiikx" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors duration-300">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 8.118c-2.136 0-3.862 1.726-3.862 3.862s1.726 3.862 3.862 3.862 3.862-1.726 3.862-3.862S14.136 8.118 12 8.118zM12 14.354c-1.294 0-2.342-1.048-2.342-2.342s1.048-2.342 2.342-2.342 2.342 1.048 2.342 2.342-1.048 2.342-2.342 2.342zM16.438 7.61a1.223 1.223 0 11-2.446 0 1.223 1.223 0 012.446 0z" clipRule="evenodd" />
              </svg>
            </Link>
            {/* LinkedIn */}
            <Link href="https://www.linkedin.com/in/abiikx/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors duration-300">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
          <p className="text-sm text-neutral-500">&copy; 2025 Magma Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
