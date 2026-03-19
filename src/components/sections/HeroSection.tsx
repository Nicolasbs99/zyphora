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
      {/* Abstract Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/tech_hero_bg.png" 
          alt="Technology Background" 
          fill
          priority
          className="object-cover object-center opacity-30 dark:opacity-40" 
        />
        {/* Soft gradient overlay to blend the image seamlessly into the content */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90 z-10"></div>
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
            {t.hero.title1} <span className="text-primary drop-shadow-sm">{t.hero.titleHighlight}</span>
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
              className="inline-flex h-12 md:h-14 items-center justify-center rounded-lg bg-primary px-8 text-base font-medium text-white transition-all hover:bg-primary/90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-lg shadow-primary/25"
            >
              {t.hero.bookCall}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="https://wa.me/1234567890?text=Hi,%20I'm%20interested%20in%20Zyphora's%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 md:h-14 items-center justify-center rounded-lg border-2 border-primary/20 bg-background/50 backdrop-blur-sm px-8 text-base font-medium text-foreground transition-colors hover:bg-primary/10 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <MessageCircle className="mr-2 h-5 w-5 text-green-500" />
              {t.hero.whatsapp}
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Abstract Animated Orbs behind the content but in front of the image base */}
      <div className="absolute top-0 right-0 z-10 h-full w-full overflow-hidden opacity-50 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[40%] -left-[10%] h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[120px] mix-blend-screen" />
      </div>
    </section>
  );
}
