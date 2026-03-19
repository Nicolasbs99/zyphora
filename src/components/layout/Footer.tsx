"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="border-t border-primary/10 bg-background py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-4 lg:gap-16">
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <span className="text-2xl font-bold tracking-tighter text-primary">
              Zyphora.
            </span>
            <p className="text-sm text-foreground/70 max-w-xs">
              {t.footer.description}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-primary">{t.footer.servicesTitle}</h3>
            <Link href="#services" className="text-sm text-foreground/70 hover:text-primary transition-colors">{t.services.items[0].title}</Link>
            <Link href="#services" className="text-sm text-foreground/70 hover:text-primary transition-colors">{t.services.items[1].title}</Link>
            <Link href="#services" className="text-sm text-foreground/70 hover:text-primary transition-colors">{t.services.items[2].title}</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-primary">{t.footer.companyTitle}</h3>
            <Link href="#process" className="text-sm text-foreground/70 hover:text-primary transition-colors">{t.header.process}</Link>
            <Link href="#testimonials" className="text-sm text-foreground/70 hover:text-primary transition-colors">{t.header.clients}</Link>
            <Link href="#contact" className="text-sm text-foreground/70 hover:text-primary transition-colors">Contact</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-primary">{t.footer.legalTitle}</h3>
            <Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">{t.footer.privacy}</Link>
            <Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">{t.footer.terms}</Link>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-primary/10 pt-8 md:flex-row text-sm text-foreground/60">
          <p>© {new Date().getFullYear()} {t.footer.rights}</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
