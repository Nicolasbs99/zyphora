"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Code2, BrainCircuit, Workflow, LayoutTemplate } from 'lucide-react';

const icons = [Code2, BrainCircuit, Workflow, LayoutTemplate];

export function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 bg-background border-t border-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-foreground/70">
            {t.services.description}
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((service, index) => {
            const Icon = icons[index];
            return (
              <div 
                key={index} 
                className="group relative flex flex-col justify-between rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
              >
                <div>
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center text-xs font-semibold text-primary uppercase tracking-wider">
                    {service.benefit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
