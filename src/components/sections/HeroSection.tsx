"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ArrowRight, MessageCircle } from 'lucide-react';
import * as motion from 'framer-motion/client';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Abstract Animated Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-primary/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-secondary/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[10%] left-[30%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-accent/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000" />
        {/* Soft grid overlay for a "tech" feel */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-10 mix-blend-overlay"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/20 backdrop-blur-md px-3 py-1 text-sm font-medium text-foreground dark:text-primary-foreground mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            {t.hero.badge}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6"
          >
            {t.hero.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-sm">{t.hero.titleHighlight}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl leading-relaxed font-medium"
          >
            {t.hero.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link 
              href="#contact"
              className="inline-flex h-12 md:h-14 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary/80 px-8 text-base font-medium text-white transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-lg shadow-primary/25"
            >
              {t.hero.bookCall}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href={`https://wa.me/1234567890?text=${encodeURIComponent(t.whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 md:h-14 items-center justify-center rounded-lg border-2 border-primary/20 bg-background/50 backdrop-blur-sm px-8 text-base font-medium text-foreground transition-colors hover:bg-primary/5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <MessageCircle className="mr-2 h-5 w-5 text-[#25D366]" />
              {t.hero.whatsapp}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
