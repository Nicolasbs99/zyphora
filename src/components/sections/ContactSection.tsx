"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import ReCAPTCHA from 'react-google-recaptcha';

const noCodeInjection = (val: string) => !val.match(/[<>{}]/);
const injectionMessage = 'Special characters (<, >, {, }) are not allowed to prevent code injection';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').refine(noCodeInjection, injectionMessage),
  email: z.string().email('Please enter a valid email address').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email provider and TLD.'),
  phone: z.string().optional().or(z.literal('')).refine(val => {
    if (!val) return true;
    const digits = val.replace(/\D/g, '');
    return digits.length === 10 || (digits.length === 12 && digits.startsWith('57'));
  }, 'Phone number must contain exactly 10 digits (e.g. +57 300 000 0000)'),
  company: z.string().optional().refine(val => !val || noCodeInjection(val), injectionMessage),
  message: z.string().min(10, 'Message must be at least 10 characters').refine(noCodeInjection, injectionMessage),
  bot_field: z.string().max(0, 'Humans only').optional(),
  captchaToken: z.string().min(1, 'Please complete the reCAPTCHA'),
});

type FormData = z.infer<typeof formSchema>;

export function ContactSection() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (data.bot_field) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              {t.contact.title}
            </h2>
            <p className="text-lg text-foreground/70">
              {t.contact.description}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900/50 rounded-2xl shadow-sm border border-primary/10 dark:border-primary/20 p-8 md:p-10">
            {submitStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{t.contact.successTitle}</h3>
                <p className="text-foreground/70 mb-8">
                  {t.contact.successDesc}
                </p>
                <button 
                  onClick={() => setSubmitStatus('idle')}
                  className="px-6 py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-colors"
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <input
                  type="text"
                  {...register('bot_field')}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-start gap-3 text-sm">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{t.contact.error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      {t.contact.nameLabel}
                    </label>
                    <input
                      id="name"
                      {...register('name')}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full h-12 px-4 text-foreground rounded-lg border border-primary/20 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-foreground/30 relative z-30 pointer-events-auto"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">{errors.name.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      {t.contact.emailLabel}
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full h-12 px-4 text-foreground rounded-lg border border-primary/20 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-foreground/30 relative z-30 pointer-events-auto"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email.message as string}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      {t.contact.phoneLabel} 
                      <span className="text-foreground/50 font-normal ml-1">{t.contact.phoneOptional}</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      placeholder={t.contact.phonePlaceholder}
                      className="w-full h-12 px-4 text-foreground rounded-lg border border-primary/20 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-foreground/30 relative z-30 pointer-events-auto"
                      disabled={isSubmitting}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500">{errors.phone.message as string}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-foreground">
                      {t.contact.companyLabel} 
                      <span className="text-foreground/50 font-normal ml-1">{t.contact.companyOptional}</span>
                    </label>
                    <input
                      id="company"
                      {...register('company')}
                      placeholder={t.contact.companyPlaceholder}
                      className="w-full h-12 px-4 text-foreground rounded-lg border border-primary/20 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-foreground/30 relative z-30 pointer-events-auto"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2 relative z-20">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    placeholder={t.contact.messagePlaceholder}
                    rows={4}
                    className="w-full p-4 text-foreground rounded-lg border border-primary/20 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-foreground/30 resize-none relative z-30 pointer-events-auto"
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500">{errors.message.message as string}</p>
                  )}
                </div>

                <div className="space-y-2 relative z-20 flex flex-col items-center sm:items-start">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                    onChange={(token) => setValue('captchaToken', token || '', { shouldValidate: true })}
                  />
                  {errors.captchaToken && (
                    <p className="text-xs text-red-500">{errors.captchaToken.message as string}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 inline-flex items-center justify-center rounded-lg bg-primary px-8 text-base font-medium text-white transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-primary/20 relative z-30"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t.contact.sendingBtn}
                    </>
                  ) : (
                    t.contact.submitBtn
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
