"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Zap, Target, LineChart, Cpu, Activity, Server, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const icons = [Zap, Target, LineChart, Cpu];

export function ValuePropositionSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/40 border-y border-primary/5 dark:border-primary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              {t.values.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-sm">{t.values.titleHighlight}</span>
            </h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              {t.values.description}
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {t.values.items.map((value, index) => {
                const Icon = icons[index];
                return (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="rounded-md bg-white dark:bg-zinc-900/50 p-2 shadow-sm border border-primary/10 dark:border-primary/20 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="font-semibold text-foreground">{value.title}</h4>
                    </div>
                    <p className="text-sm text-foreground/70 ml-[52px]">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none flex items-center justify-center lg:justify-end">
            <div className="relative w-full pb-10 pr-10">
              {/* Main Dashboard Mockup */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative z-10 w-full rounded-2xl bg-white dark:bg-zinc-900 border border-primary/10 dark:border-primary/20 shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Window Header */}
                <div className="h-10 bg-zinc-50 dark:bg-zinc-950 border-b border-primary/5 dark:border-primary/10 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="mx-auto px-4 py-1 rounded-md bg-white dark:bg-zinc-900 border border-primary/5 dark:border-primary/10 text-[10px] font-medium text-foreground/50">
                    zyphora-engine-v2.config
                  </div>
                </div>
                
                {/* Window Body */}
                <div className="p-6 bg-white dark:bg-zinc-900">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h5 className="font-semibold text-foreground text-sm">System Overview</h5>
                      <p className="text-xs text-foreground/50">Live metrics & API performance</p>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-50 border border-green-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[10px] font-medium text-green-600">All systems operational</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { label: "Uptime", value: "99.99%", icon: Server, color: "text-blue-500", bg: "bg-blue-50" },
                      { label: "Avg Latency", value: "12ms", icon: Activity, color: "text-amber-500", bg: "bg-amber-50" },
                      { label: "Security", value: "Secure", icon: ShieldCheck, color: "text-green-500", bg: "bg-green-50" }
                    ].map((stat, i) => {
                      const StatIcon = stat.icon;
                      return (
                        <div key={i} className="p-3 rounded-xl border border-primary/5 flex flex-col gap-2">
                          <div className={`w-6 h-6 rounded-md ${stat.bg} ${stat.color} flex items-center justify-center`}>
                            <StatIcon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-[10px] text-foreground/50 mb-0.5">{stat.label}</div>
                            <div className="font-semibold text-sm">{stat.value}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-medium text-foreground/70">Traffic Analysis</div>
                    <div className="h-24 w-full flex items-end justify-between gap-1.5 pb-2">
                      {[40, 65, 45, 80, 55, 90, 75, 100, 60, 85, 50, 70].map((height, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${height}%` }}
                          transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                          viewport={{ once: true }}
                          className={`w-full rounded-t-sm ${i === 7 ? 'bg-primary' : 'bg-primary/10 hover:bg-primary/20 transition-colors'}`}
                        ></motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Element 1 - Notification */}
              <motion.div 
                initial={{ opacity: 0, x: 20, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="absolute -right-4 top-1/4 z-20 bg-white dark:bg-zinc-900 p-3 rounded-xl shadow-xl border border-primary/10 dark:border-primary/20 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold">Deployment Success</div>
                  <div className="text-[10px] text-foreground/50">Just now • v2.0.4 live</div>
                </div>
              </motion.div>

              {/* Floating Element 2 - Code snippet */}
              <motion.div 
                initial={{ opacity: 0, x: -20, y: -10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute -left-6 bottom-16 z-20 bg-primary p-4 rounded-xl shadow-xl border border-primary/20 text-white w-48 hidden md:block"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                <pre className="text-[9px] font-mono leading-relaxed opacity-90">
                  <span className="text-pink-400">const</span> init <span className="text-pink-400">=</span> <span className="text-amber-200">async</span> () <span className="text-pink-400">{`=>`}</span> {`{`}<br/>
                  &nbsp;&nbsp;<span className="text-amber-200">await</span> zyphora.<span className="text-blue-300">connect</span>();<br/>
                  &nbsp;&nbsp;console.<span className="text-blue-300">log</span>(<span className="text-green-300">&apos;Ready&apos;</span>);<br/>
                  {`}`};
                </pre>
              </motion.div>

            </div>
            {/* Decorative dots */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-full w-full opacity-50" style={{ backgroundImage: 'radial-gradient(#0A2540 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
            <div className="absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-[80px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
