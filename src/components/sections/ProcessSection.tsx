"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function ProcessSection() {
  const { t } = useLanguage();

  return (
    <section id="process" className="py-24 bg-background border-t border-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 md:text-center max-w-2xl md:mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            {t.process.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent drop-shadow-sm">{t.process.titleHighlight}</span>
          </h2>
          <p className="text-lg text-foreground/70">
            {t.process.description}
          </p>
        </div>
        
        <div className="grid gap-10 md:grid-cols-4 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-primary/10 -z-10"></div>
          
          {t.process.items.map((step, index) => (
            <div key={index} className="relative flex flex-col md:items-center md:text-center">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-zinc-950 border-2 border-primary text-xl font-bold text-primary shadow-sm z-10 transition-transform hover:scale-110 duration-300">
                0{index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed md:px-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
