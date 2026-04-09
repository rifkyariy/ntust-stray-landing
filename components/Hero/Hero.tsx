import React from 'react'
import Link from 'next/link'
import {
  PawPrint, Wifi, Thermometer, Droplets, LayoutDashboard,
  CheckCircle2, Activity, ArrowRight, ChevronDown,
} from 'lucide-react'
import GradientOrbs from '../Backgrounds/GradientOrbs'

const stats = [
  { value: '99.2%', label: 'System Uptime' },
  { value: '247',   label: 'Cats Tracked'  },
  { value: '4.2K',  label: 'Meals Served'  },
  { value: '6',     label: 'Smart Feeders' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg-primary grid-bg">
      <GradientOrbs />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left ── */}
          <div className="animate-slide-in-left">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-cyan/30 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <Wifi size={13} className="text-accent-cyan" />
              <span className="text-text-secondary text-sm font-medium">System Online · 6 feeders active</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              Smart Care for{' '}
              <span className="gradient-text">Campus Strays</span>
            </h1>

            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-6 max-w-lg">
              Stray is an end-to-end IoT platform that automates feeding schedules, runs on-device YOLOv8 cat detection, and lets volunteers monitor every feeder from a single dashboard — so no campus cat goes hungry.
            </p>

            {/* Goal callouts */}
            <div className="flex flex-col gap-2 mb-10">
              {[
                'Eliminate missed feedings with schedule automation',
                'Identify individual cats with edge-AI vision',
                'Let anyone donate food or sponsor a cat via QR',
              ].map((g) => (
                <div key={g} className="flex items-start gap-2.5 text-sm text-text-secondary">
                  <CheckCircle2 size={15} className="text-accent-cyan flex-shrink-0 mt-0.5" />
                  {g}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/demo"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-indigo text-white font-semibold shadow-lg shadow-accent-cyan/25 hover:shadow-accent-cyan/40 hover:scale-105 transition-all">
                <LayoutDashboard size={16} /> Open Live Dashboard
                <ArrowRight size={15} />
              </Link>
              <a href="#features"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/15 text-text-secondary font-medium hover:border-accent-cyan/40 hover:text-accent-cyan transition-all">
                See Features
              </a>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="text-center p-3 rounded-xl glass border border-white/10">
                  <div className="font-display text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-text-muted text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: live device card mockup ── */}
          <div className="animate-slide-in-right hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-cyan/20 to-accent-indigo/20 blur-2xl scale-110" />

              {/* Device card */}
              <div className="relative glass-strong rounded-3xl p-7 w-80 animate-float">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-text-muted text-xs font-mono">F-07 · Engineering A</p>
                    <p className="font-display font-bold text-lg">Smart Feeder</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                    <Wifi size={16} className="text-green-400" />
                  </div>
                </div>

                {/* Food level */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs text-text-muted mb-2">
                    <span className="flex items-center gap-1"><Activity size={10} /> Food Level</span>
                    <span className="text-accent-cyan font-semibold">78%</span>
                  </div>
                  <div className="h-2 bg-bg-primary rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-indigo" style={{ width: '78%' }} />
                  </div>
                </div>

                {/* Vitals */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[
                    { Icon: Thermometer, val: '26°C',  lbl: 'Temp'     },
                    { Icon: Droplets,    val: '58%',   lbl: 'Humidity' },
                    { Icon: PawPrint,    val: '3',     lbl: 'Cats'     },
                  ].map((v) => (
                    <div key={v.lbl} className="bg-bg-primary/50 rounded-xl p-3 text-center">
                      <v.Icon size={14} className="mx-auto text-text-muted mb-1" />
                      <div className="font-semibold text-sm text-text-primary">{v.val}</div>
                      <div className="text-text-muted text-[10px]">{v.lbl}</div>
                    </div>
                  ))}
                </div>

                {/* Last fed */}
                <div className="flex items-center justify-between text-xs text-text-muted px-3 py-2 rounded-xl bg-bg-primary/50 border border-white/5">
                  <span className="flex items-center gap-1.5"><Activity size={10} /> Last fed</span>
                  <span className="text-text-secondary font-medium">2 hr ago · 2 cats</span>
                </div>
              </div>

              {/* Floating chips */}
              <div className="absolute -top-4 -right-4 glass border border-green-500/30 rounded-xl px-3 py-2 flex items-center gap-1.5 text-xs font-medium text-green-400 animate-float" style={{ animationDelay: '1s' }}>
                <PawPrint size={11} /> Cat detected
              </div>
              <div className="absolute -bottom-4 -left-4 glass border border-accent-cyan/30 rounded-xl px-3 py-2 flex items-center gap-1.5 text-xs font-medium text-accent-cyan animate-float" style={{ animationDelay: '2s' }}>
                <Wifi size={11} /> Data synced
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted animate-fade-in">
        <span className="text-xs">Scroll to explore</span>
        <ChevronDown size={18} className="animate-bounce" />
      </div>
    </section>
  )
}
