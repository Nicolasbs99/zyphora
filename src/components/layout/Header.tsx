"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
          <span className="text-2xl font-bold tracking-tighter text-primary">
            Zyphora.
          </span>
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link href="#services" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            {t.header.services}
          </Link>
          <Link href="#process" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            {t.header.process}
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            {t.header.clients}
          </Link>
        </nav>
        <div className="flex items-center gap-1 md:gap-3">
          <ThemeToggle />
          <button 
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors p-2 rounded-md hover:bg-primary/5"
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4" />
            <span className="uppercase">{language}</span>
          </button>
          
          <Link
            href="#contact"
            className="hidden sm:inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
          >
            {t.header.bookCall}
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground/80 hover:text-primary"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-primary/10 bg-background overflow-hidden"
          >
            <nav className="flex flex-col container mx-auto px-4 py-4 space-y-4">
              <Link 
                href="#services" 
                className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={closeMobileMenu}
              >
                {t.header.services}
              </Link>
              <Link 
                href="#process" 
                className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={closeMobileMenu}
              >
                {t.header.process}
              </Link>
              <Link 
                href="#testimonials" 
                className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={closeMobileMenu}
              >
                {t.header.clients}
              </Link>
              <Link
                href="#contact"
                className="inline-flex h-12 w-full mt-4 items-center justify-center rounded-lg bg-primary px-6 text-base font-medium text-white transition-colors hover:bg-primary/90"
                onClick={closeMobileMenu}
              >
                {t.header.bookCall}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
