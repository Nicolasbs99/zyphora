"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="py-24 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-lg text-white/80">
             {t.testimonials.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.testimonials.items.map((testimonial, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/10 p-8 rounded-2xl flex flex-col">
              <div className="flex gap-1 mb-6 text-[#3A86FF]">
                {/* 5 stars */}
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <blockquote className="text-lg font-medium leading-relaxed mb-8 flex-grow">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              <div className="flex items-center gap-4 mt-auto">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                  {/* Generate initial from role or static string if needed, we'll just use a generic user icon logic or letters */}
                  {idx === 0 ? "J" : idx === 1 ? "J" : "S"}
                </div>
                <div>
                  <div className="font-semibold">{/* We can omit author name mapping or hardcode names here, since only the role is in translation currently. Let's hardcode the names since they are names */}
                    {idx === 0 ? "Jane Doe" : idx === 1 ? "John Smith" : "Sarah Jenkins"}
                  </div>
                  <div className="text-sm text-white/70">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
