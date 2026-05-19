/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, type MotionProps } from 'motion/react';
import { ShieldAlert } from 'lucide-react';

interface StatsPageProps {
  onBack: () => void;
}

const fadeUp: Partial<MotionProps> = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function StatsPage({ onBack }: StatsPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium mb-10 transition-colors group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            Back to Stories
          </button>
          <div className="max-w-3xl">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-4 block">
              By the Numbers
            </span>
            <h1 className="text-4xl lg:text-6xl font-display font-black mb-6 leading-[1.1]">
              The data behind<br />
              <span className="text-purple-400">period poverty.</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
              These aren't just statistics — they are people. Behind every percentage is someone
              who missed school, skipped work, or went without because they couldn't afford to bleed.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 01: Period Poverty ───────────────────────────────────── */}
      <section id="stat-poverty" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="border-l-4 border-rose-500 pl-5 mb-12">
            <span className="text-rose-500 text-xs font-bold uppercase tracking-widest mb-1 block">
              Section 01
            </span>
            <h2 className="text-3xl lg:text-4xl font-display font-black text-slate-900">
              Period Poverty
            </h2>
            <p className="text-slate-500 mt-2 max-w-2xl text-sm leading-relaxed">
              Period poverty means being unable to access or afford menstrual products.
              It affects millions in the US alone — and the numbers are getting worse.
            </p>
          </div>

          {/* Hero stat + supporting cards */}
          <motion.div
            {...fadeUp}
            className="grid lg:grid-cols-2 gap-8 mb-8 p-8 lg:p-12 rounded-3xl bg-rose-50 border border-rose-100"
          >
            <div>
              <div className="text-[8rem] lg:text-[10rem] font-display font-black text-rose-500 leading-none mb-4">
                42%
              </div>
              <p className="text-xl font-display font-bold text-slate-800 mb-3 leading-snug">
                of women in the US have experienced period poverty in their lifetime
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                Nearly half of all women in the United States have gone without menstrual
                products at some point in their lives — a figure that has risen steadily
                since 2018 and reflects how widespread the crisis truly is.
              </p>
              <p className="text-slate-400 text-xs mt-3">Source: Dignity Grows, November 2025</p>
            </div>
            <div className="flex flex-col justify-center gap-4">
              {[
                { value: '1 in 4', label: 'students struggle to afford period products' },
                { value: '16.9M', label: 'menstruating women in the US live in poverty' },
                { value: '14.2%', label: 'of college women experienced period poverty in the past year' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-rose-100">
                  <div className="text-3xl font-display font-black text-rose-500 mb-1">
                    {stat.value}
                  </div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Rising trend + 46% callout */}
          <motion.div {...fadeUp} className="grid lg:grid-cols-2 gap-6">
            <div className="p-7 rounded-3xl border border-slate-100 bg-white">
              <p className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-1">
                Rising Trend
              </p>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-6">
                Period poverty is increasing
              </h3>
              {[
                { year: '2018', pct: 30, label: '30%', color: 'bg-rose-200' },
                { year: '2021', pct: 35, label: '35%', color: 'bg-rose-400' },
                { year: '2025', pct: 42, label: '42%', color: 'bg-rose-600' },
              ].map((d, i) => (
                <div key={i} className="mb-5">
                  <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                    <span>{d.year}</span>
                    <span className="font-bold">{d.pct}%</span>
                  </div>
                  <div className="w-full h-8 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${d.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.15 + 0.2 }}
                      className={`h-full ${d.color} rounded-full flex items-center px-3`}
                    >
                      <span className="text-xs font-bold text-white whitespace-nowrap">
                        {d.label}
                      </span>
                    </motion.div>
                  </div>
                </div>
              ))}
              <p className="text-xs text-slate-400 mt-2">
                % of women in the US who have experienced period poverty in their lifetime
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Source: Dignity Grows, November 2025
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-rose-600 text-white flex flex-col justify-center">
              <div className="text-8xl font-display font-black text-white/80 leading-none mb-5">
                42%
              </div>
              <h3 className="text-xl font-display font-bold mb-3 leading-snug">
                of women in the US have experienced period poverty in their lifetime
              </h3>
              <p className="text-rose-100 text-sm leading-relaxed">
                Nearly half of all women in the US have gone without period products at some
                point in their lives — a number that has climbed steadily since 2018.
              </p>
              <p className="text-rose-200/70 text-xs mt-4">Source: Dignity Grows, November 2025</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Section 02: Stigma ──────────────────────────────────────────── */}
      <section id="stat-stigma" className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="border-l-4 border-purple-500 pl-5 mb-12">
            <span className="text-purple-500 text-xs font-bold uppercase tracking-widest mb-1 block">
              Section 02
            </span>
            <h2 className="text-3xl lg:text-4xl font-display font-black text-slate-900">
              Stigma
            </h2>
            <p className="text-slate-500 mt-2 max-w-2xl text-sm leading-relaxed">
              Shame around menstruation isn't just cultural — it has measurable consequences
              on mental health, self-worth, and access to care.
            </p>
          </div>

          {/* 92% pull quote */}
          <motion.div
            {...fadeUp}
            className="p-8 lg:p-12 rounded-3xl bg-purple-600 text-white mb-8"
          >
            <div className="max-w-3xl">
              <div className="text-8xl lg:text-[9rem] font-display font-black text-purple-300 leading-none mb-6">
                92%
              </div>
              <p className="text-2xl lg:text-3xl font-display font-bold leading-snug mb-4">
                of teens agree that periods should be a health indicator, not something shameful.
              </p>
              <p className="text-purple-200 text-sm leading-relaxed">
                Despite widespread recognition that menstruation is normal and healthy,
                stigma persists — shaping how young people seek help, talk to doctors,
                and view their own bodies.
              </p>
            </div>
          </motion.div>

          {/* 59% + 42-60% */}
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-7 rounded-3xl bg-white border border-purple-100">
              <div className="text-7xl font-display font-black text-purple-500 leading-none mb-4">
                59%
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
                of teens feel personally affected by negative associations with menstruation
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                More than half of teenagers report that cultural stigma around periods has
                directly affected them — including avoiding activities, hiding products,
                or feeling unable to talk openly about their health.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-purple-50 border border-purple-100">
              <div className="text-5xl font-display font-black text-purple-600 leading-none mb-1">
                42–60%
              </div>
              <p className="text-xs text-purple-400 font-semibold uppercase tracking-wide mb-4">
                Range across studies
              </p>
              <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
                of teens report feeling ashamed about their periods
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Study after study finds that between 4 and 6 in 10 young people feel shame
                connected to their period — despite it being a universal biological process that
                affects half the population.
              </p>
            </div>
          </motion.div>

          {/* Historical callout */}
          <motion.div
            {...fadeUp}
            className="p-7 lg:p-10 rounded-3xl bg-slate-900 text-white"
          >
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <ShieldAlert className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">
                  Historical Context
                </p>
                <h3 className="text-xl font-display font-bold text-white mb-3">
                  Before 1993, women were rarely included in clinical trials.
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                  The NIH didn't require the inclusion of women in federally funded clinical
                  research until 1993. This means decades of medical knowledge — including
                  drug dosages, treatment protocols, and disease research — was built almost
                  entirely on male bodies. The normalization of excluding female biology from
                  science is inseparable from the culture that stigmatizes menstruation.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Section 03: Policy ──────────────────────────────────────────── */}
      <section id="stat-policy" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="border-l-4 border-blue-500 pl-5 mb-12">
            <span className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-1 block">
              Section 03
            </span>
            <h2 className="text-3xl lg:text-4xl font-display font-black text-slate-900">
              Policy
            </h2>
            <p className="text-slate-500 mt-2 max-w-2xl text-sm leading-relaxed">
              Policy shapes access. From sales tax to SNAP benefits to school funding,
              legislative decisions directly determine who can afford to manage their period.
            </p>
          </div>

          {/* SNAP callout */}
          <motion.div
            {...fadeUp}
            className="p-7 lg:p-10 rounded-3xl bg-amber-50 border-2 border-amber-200 mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
                <span className="text-amber-700 font-black text-sm leading-none">!</span>
              </div>
              <span className="text-amber-700 text-xs font-bold uppercase tracking-widest">
                Critical Policy Gap
              </span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-display font-bold text-slate-900 mb-3">
              Period products are{' '}
              <span className="underline decoration-amber-400 decoration-[3px]">not</span>{' '}
              covered by SNAP benefits.
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
              SNAP (formerly food stamps) helps 42 million Americans afford food — but menstrual
              products are explicitly excluded. For the lowest-income families, this means
              period supplies must come out of whatever cash remains after food, rent, and utilities.
              There is no federal program that covers them.
            </p>
          </motion.div>

          {/* 27 states + legislative pipeline */}
          <div className="grid lg:grid-cols-2 gap-6">

            <motion.div {...fadeUp} className="p-7 rounded-3xl bg-blue-600 text-white">
              <div className="text-[8rem] font-display font-black text-blue-200 leading-none mb-4">
                27
              </div>
              <h3 className="text-2xl font-display font-bold mb-3 leading-snug">
                states still tax period products as a luxury good
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                In 27 US states, menstrual products are subject to sales tax — classified
                alongside non-essential luxury items. Groceries, prescription drugs, and even
                Viagra are tax-exempt in many of these same states.
              </p>
            </motion.div>

            <motion.div {...fadeUp} className="p-7 rounded-3xl bg-white border border-slate-100">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">
                Legislative Pipeline
              </p>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                Menstrual equity bills stall in legislatures
              </h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Only 15 states have introduced menstrual equity bills as of 2024.
                Of all bills introduced nationwide, the vast majority go nowhere.
              </p>

              <div>
                <div className="flex justify-between text-sm text-slate-600 font-medium mb-2.5">
                  <span>58 bills introduced across all states</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {Array.from({ length: 58 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.012, duration: 0.2 }}
                      className={`w-4 h-4 rounded-sm ${i < 5 ? 'bg-blue-500' : 'bg-slate-200'}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-blue-500 flex-shrink-0" />
                  <span className="text-sm text-slate-600">
                    <span className="font-bold text-slate-900">5 enacted</span>
                    {' '}— only 8.6% of bills became law
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="w-3 h-3 rounded-sm bg-slate-200 flex-shrink-0" />
                  <span className="text-sm text-slate-500">53 stalled, failed, or pending</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Sources ─────────────────────────────────────────────────────── */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Sources</p>
          <p className="text-slate-400 text-xs leading-relaxed max-w-3xl">
            Data compiled from: Alliance for Period Supplies, PERIOD (the organization),
            National Center for Health Statistics, Period Poverty Project, Alliance for Period Supplies
            Annual Report, National Institutes of Health, State Policy Tracker on Menstrual Equity,
            and peer-reviewed research published 2018–2024. Statistics reflect US data unless
            otherwise noted.
          </p>
        </div>
      </section>
    </motion.div>
  );
}
