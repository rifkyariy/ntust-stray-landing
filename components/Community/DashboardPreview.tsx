'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  PawPrint, Package, UtensilsCrossed, BellRing, Wifi, AlertTriangle,
  Monitor, Smartphone, ArrowRight,
} from 'lucide-react'
import GlassCard from '../Common/GlassCard'

// Mirror the real demo data so the landing preview is truthful
const feeders = [
  { id: 'F-01', location: 'Main Gate',      status: 'Online', level: 91, cats: 12 },
  { id: 'F-07', location: 'Engineering A',  status: 'Online', level: 78, cats: 7  },
  { id: 'F-12', location: 'Central Library',status: 'Online', level: 44, cats: 17 },
  { id: 'F-18', location: 'East Dormitory', status: 'Low',    level: 17, cats: 4  },
]

export default function DashboardPreview() {
  const [tab, setTab] = useState<'web' | 'mobile'>('web')

  return (
    <section id="dashboard" className="py-24 px-6 bg-bg-primary relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gradient-to-tl from-accent-indigo/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-cyan/30 mb-6">
            <Monitor size={13} className="text-accent-cyan" />
            <span className="text-accent-cyan text-sm font-medium">Live System Preview</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Everything in{' '}
            <span className="gradient-text">One Dashboard</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            The screenshots below are pulled from the actual running system. Click any feeder in the demo to open its camera feed, edit its schedule, or trigger a manual dispense.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link href="/demo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-indigo text-white text-sm font-semibold shadow-lg shadow-accent-cyan/20 hover:scale-105 transition-transform">
              <Monitor size={14} /> Open Live Demo <ArrowRight size={13} />
            </Link>
            <Link href="/mobile"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/15 text-text-secondary text-sm font-medium hover:border-accent-cyan/40 hover:text-accent-cyan transition-all">
              <Smartphone size={14} /> Mobile Donation Portal
            </Link>
          </div>
        </div>

        {/* Tab */}
        <div className="flex justify-center mb-8">
          <div className="flex glass rounded-xl p-1 gap-1 border border-white/10">
            {([
              { id: 'web' as const,    Icon: Monitor,     label: 'Device Dashboard' },
              { id: 'mobile' as const, Icon: Smartphone,  label: 'Mobile App'       },
            ]).map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === t.id
                    ? 'bg-gradient-to-r from-accent-cyan to-accent-indigo text-white shadow-md'
                    : 'text-text-muted hover:text-text-primary'
                }`}>
                <t.Icon size={13} /> {t.label}
              </button>
            ))}
          </div>
        </div>

        {tab === 'web' ? (
          <GlassCard intensity="strong" className="p-6 overflow-hidden">
            {/* App bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-indigo flex items-center justify-center">
                  <PawPrint size={13} className="text-white" />
                </div>
                <span className="font-display font-bold">Stray · Device Dashboard</span>
              </div>
              <span className="text-xs text-green-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                All systems operational
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { Icon: Package,        label: 'Active Feeders', val: '4/6',  color: 'text-accent-cyan'   },
                { Icon: PawPrint,       label: 'Cats Today',     val: '40',   color: 'text-accent-indigo' },
                { Icon: UtensilsCrossed,label: 'Meals Today',    val: '30',   color: 'text-green-400'     },
                { Icon: BellRing,       label: 'Alerts',         val: '1',    color: 'text-orange-400'    },
              ].map((s) => (
                <div key={s.label} className="p-4 bg-bg-primary/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text-muted text-xs">{s.label}</span>
                    <s.Icon size={14} className={s.color} />
                  </div>
                  <p className={`font-display text-2xl font-bold ${s.color}`}>{s.val}</p>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-text-muted text-xs border-b border-white/10">
                    <th className="text-left pb-3">Feeder</th>
                    <th className="text-left pb-3">Location</th>
                    <th className="text-left pb-3">Status</th>
                    <th className="text-left pb-3">Food Level</th>
                    <th className="text-left pb-3">Cats Today</th>
                  </tr>
                </thead>
                <tbody>
                  {feeders.map((f) => (
                    <tr key={f.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 font-mono text-accent-cyan">{f.id}</td>
                      <td className="py-3 text-text-secondary">{f.location}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                          f.status === 'Online'
                            ? 'bg-green-500/15 text-green-400 border border-green-500/25'
                            : 'bg-orange-500/15 text-orange-400 border border-orange-500/25'
                        }`}>
                          {f.status === 'Online'
                            ? <Wifi size={9} />
                            : <AlertTriangle size={9} />}
                          {f.status}
                        </span>
                      </td>
                      <td className="py-3 w-36">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-bg-primary rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${f.level < 25 ? 'bg-orange-400' : 'bg-gradient-to-r from-accent-cyan to-accent-indigo'}`}
                              style={{ width: `${f.level}%` }} />
                          </div>
                          <span className={`text-xs w-8 ${f.level < 25 ? 'text-orange-400 font-semibold' : 'text-text-muted'}`}>{f.level}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="flex items-center gap-1 text-text-secondary">
                          <PawPrint size={11} className="text-text-muted" /> {f.cats}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        ) : (
          /* Mobile mockup */
          <div className="flex justify-center">
            <div className="w-72 glass-strong rounded-3xl p-6 border-2 border-white/10 animate-float">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-1 bg-white/20 rounded-full" />
              </div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-text-muted text-xs">Good morning</p>
                  <p className="font-display font-bold flex items-center gap-1.5">
                    <PawPrint size={14} className="text-accent-cyan" /> Campus Cats
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-cyan to-accent-indigo flex items-center justify-center text-xs font-bold">A</div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-bg-primary/60 rounded-xl p-3">
                  <p className="text-2xl font-bold text-accent-cyan">40</p>
                  <p className="text-text-muted text-xs flex items-center gap-1 mt-0.5"><PawPrint size={9} /> Cats today</p>
                </div>
                <div className="bg-bg-primary/60 rounded-xl p-3">
                  <p className="text-2xl font-bold text-accent-indigo">4</p>
                  <p className="text-text-muted text-xs flex items-center gap-1 mt-0.5"><Wifi size={9} /> Online</p>
                </div>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <BellRing size={12} className="text-orange-400" />
                  <p className="text-orange-400 text-xs font-semibold">Low Food Alert</p>
                </div>
                <p className="text-text-muted text-xs">F-18 East Dormitory at 17%</p>
              </div>
              {feeders.slice(0, 2).map((f) => (
                <div key={f.id} className="flex items-center gap-3 p-3 bg-bg-primary/40 rounded-xl mb-2">
                  <div className="w-8 h-8 rounded-lg bg-accent-cyan/15 flex items-center justify-center">
                    <Package size={13} className="text-accent-cyan" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text-primary truncate">{f.location}</p>
                    <div className="h-1 bg-bg-primary rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent-cyan to-accent-indigo rounded-full" style={{ width: `${f.level}%` }} />
                    </div>
                  </div>
                  <span className="text-xs text-text-muted">{f.level}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
