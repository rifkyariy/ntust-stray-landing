'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import GlassCard from '../Common/GlassCard'

const feeders = [
  { id: 'F-01', location: 'Main Gate', status: 'Online', level: 92, cats: 5 },
  { id: 'F-07', location: 'Building A', status: 'Online', level: 78, cats: 3 },
  { id: 'F-12', location: 'Library', status: 'Online', level: 45, cats: 7 },
  { id: 'F-18', location: 'Dorm East', status: 'Low', level: 18, cats: 2 },
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
            <span className="text-accent-cyan text-sm font-medium">Live Preview</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Powerful{' '}
            <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Monitor all feeders, track cat activity, and manage your colony in real time from any device.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link href="/demo" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-indigo text-white text-sm font-semibold shadow-lg shadow-accent-cyan/20 hover:scale-105 transition-transform">
              🖥️ Open Live Demo →
            </Link>
            <Link href="/mobile" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/15 text-text-secondary text-sm font-medium hover:border-accent-cyan/40 hover:text-accent-cyan transition-all">
              📱 Mobile Preview
            </Link>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div className="flex glass rounded-xl p-1 gap-1">
            {(['web', 'mobile'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  tab === t
                    ? 'bg-gradient-to-r from-accent-cyan to-accent-indigo text-white shadow-md'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {t === 'web' ? '🖥️ Web' : '📱 Mobile'}
              </button>
            ))}
          </div>
        </div>

        {tab === 'web' ? (
          /* Web dashboard mockup */
          <GlassCard intensity="strong" className="p-6 overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-xl">🐾</span>
                <span className="font-display font-bold">Stray Dashboard</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-green-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  All systems operational
                </span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-cyan to-accent-indigo" />
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Active Feeders', val: '16/18', icon: '📦', color: 'text-accent-cyan' },
                { label: 'Cats Tracked', val: '247', icon: '🐱', color: 'text-accent-indigo' },
                { label: 'Meals Today', val: '89', icon: '🍽️', color: 'text-green-400' },
                { label: 'Alerts', val: '2', icon: '🔔', color: 'text-orange-400' },
              ].map((s) => (
                <div key={s.label} className="p-4 bg-bg-primary/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text-muted text-xs">{s.label}</span>
                    <span>{s.icon}</span>
                  </div>
                  <p className={`font-display text-2xl font-bold ${s.color}`}>{s.val}</p>
                </div>
              ))}
            </div>

            {/* Feeder table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-text-muted text-xs border-b border-white/10">
                    <th className="text-left pb-3">Feeder</th>
                    <th className="text-left pb-3">Location</th>
                    <th className="text-left pb-3">Status</th>
                    <th className="text-left pb-3">Level</th>
                    <th className="text-left pb-3">Cats</th>
                  </tr>
                </thead>
                <tbody>
                  {feeders.map((f) => (
                    <tr key={f.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 font-mono text-accent-cyan">{f.id}</td>
                      <td className="py-3 text-text-secondary">{f.location}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          f.status === 'Online'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-orange-500/20 text-orange-400'
                        }`}>
                          {f.status}
                        </span>
                      </td>
                      <td className="py-3 w-32">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-bg-primary rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${f.level < 25 ? 'bg-orange-400' : 'bg-gradient-to-r from-accent-cyan to-accent-indigo'}`}
                              style={{ width: `${f.level}%` }}
                            />
                          </div>
                          <span className="text-xs text-text-muted w-8">{f.level}%</span>
                        </div>
                      </td>
                      <td className="py-3 text-text-secondary">{f.cats} 🐱</td>
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
              {/* Phone notch */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-1.5 bg-white/20 rounded-full" />
              </div>

              {/* App header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-text-muted text-xs">Good morning</p>
                  <p className="font-display font-bold">Campus Cats 🐾</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-cyan to-accent-indigo flex items-center justify-center text-xs font-bold">
                  A
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-bg-primary/60 rounded-xl p-3">
                  <p className="text-2xl font-bold text-accent-cyan">247</p>
                  <p className="text-text-muted text-xs">Cats tracked</p>
                </div>
                <div className="bg-bg-primary/60 rounded-xl p-3">
                  <p className="text-2xl font-bold text-accent-indigo">16</p>
                  <p className="text-text-muted text-xs">Feeders online</p>
                </div>
              </div>

              {/* Alert card */}
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span>🔔</span>
                  <p className="text-orange-400 text-xs font-semibold">Low Food Alert</p>
                </div>
                <p className="text-text-muted text-xs">Feeder F-18 at 18% capacity</p>
              </div>

              {/* Feed list */}
              {feeders.slice(0, 2).map((f) => (
                <div key={f.id} className="flex items-center gap-3 p-3 bg-bg-primary/40 rounded-xl mb-2">
                  <div className="w-8 h-8 rounded-lg bg-accent-cyan/20 flex items-center justify-center text-xs font-bold text-accent-cyan">
                    {f.id.slice(-2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text-primary truncate">{f.location}</p>
                    <div className="h-1 bg-bg-primary rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent-cyan to-accent-indigo rounded-full"
                        style={{ width: `${f.level}%` }}
                      />
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
