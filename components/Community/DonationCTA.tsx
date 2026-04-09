import React from 'react'
import Link from 'next/link'
import {
  Package, PawPrint, Zap, AlertTriangle, CheckCircle2,
  Lock, Mail, X, Building2, ArrowRight, Heart,
} from 'lucide-react'
import GlassCard from '../Common/GlassCard'

// ── Real feeder data from the live demo ───────────────────────────────────────
const urgentFeeders = [
  { id: 'F-18', name: 'East Dormitory',  level: 17, cats: 4,  status: 'low'  },
  { id: 'F-12', name: 'Central Library', level: 44, cats: 17, status: 'ok'   },
  { id: 'F-07', name: 'Engineering A',   level: 78, cats: 7,  status: 'ok'   },
]

// ── Real cat data from the demo sponsor list ──────────────────────────────────
const sponsorCats = [
  { id: 'CAT-003', name: 'Mochi',  age: '~3 yrs', location: 'Library',   status: 'Healthy',  meals: 127, sponsors: 4,  grad: 'from-orange-400 to-amber-300'  },
  { id: 'CAT-007', name: 'Shadow', age: '~5 yrs', location: 'Main Gate', status: 'Healthy',  meals: 204, sponsors: 7,  grad: 'from-slate-400 to-slate-300'   },
  { id: 'CAT-019', name: 'Pepper', age: '~1 yr',  location: 'Main Gate', status: 'Kitten',   meals: 43,  sponsors: 5,  grad: 'from-rose-400 to-pink-300'     },
  { id: 'CAT-033', name: 'Atlas',  age: '~6 yrs', location: 'Library',   status: 'Senior',   meals: 312, sponsors: 6,  grad: 'from-violet-400 to-purple-300' },
]

const statusCls = {
  Healthy: 'bg-green-500/15 text-green-400 border-green-500/25',
  Kitten:  'bg-pink-500/15  text-pink-400  border-pink-500/25',
  Senior:  'bg-purple-500/15 text-purple-400 border-purple-500/25',
  'Post-TNR': 'bg-blue-500/15 text-blue-400 border-blue-500/25',
}

const trustItems = [
  { Icon: Lock,     text: 'Secure payments'       },
  { Icon: Mail,     text: 'Instant confirmation'  },
  { Icon: X,        text: 'Cancel anytime'        },
  { Icon: Building2,text: 'Tax-deductible'        },
]

export default function DonationCTA() {
  return (
    <section id="donate" className="py-24 px-6 bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-accent-cyan/5 via-accent-indigo/5 to-accent-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-pink-500/30 mb-6">
            <Heart size={13} className="text-pink-400" />
            <span className="text-pink-400 text-sm font-medium">Support the System</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Top Up a Feeder or{' '}
            <span className="gradient-text">Sponsor a Cat</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Every contribution maps directly to a specific feeder or cat you can track live in the dashboard. Scan the QR on your phone to start.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* ── Feeder donations ── */}
          <GlassCard className="p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/20 flex items-center justify-center">
                <Package size={18} className="text-sky-400" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">Donate to a Feeder</h3>
                <p className="text-text-muted text-xs">Food goes to the feeder you choose, tracked in real time</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {urgentFeeders.map((f) => (
                <div key={f.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  f.status === 'low'
                    ? 'border-orange-500/30 bg-orange-500/8'
                    : 'border-white/10 bg-white/[0.03]'
                }`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    f.status === 'low' ? 'bg-orange-500/20' : 'bg-sky-500/15'
                  }`}>
                    {f.status === 'low'
                      ? <AlertTriangle size={16} className="text-orange-400" />
                      : <Package size={16} className="text-sky-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-sky-400 font-semibold">{f.id}</span>
                        <span className="text-sm font-medium text-text-primary">{f.name}</span>
                      </div>
                      {f.status === 'low' && (
                        <span className="text-[10px] font-bold text-orange-400 flex items-center gap-1">
                          <AlertTriangle size={9} /> URGENT
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-bg-primary rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${f.level < 25 ? 'bg-orange-400' : 'bg-gradient-to-r from-accent-cyan to-accent-indigo'}`}
                          style={{ width: `${f.level}%` }} />
                      </div>
                      <span className={`text-xs font-semibold w-8 ${f.level < 25 ? 'text-orange-400' : 'text-text-muted'}`}>{f.level}%</span>
                      <span className="flex items-center gap-1 text-xs text-text-muted">
                        <PawPrint size={9} /> {f.cats}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/mobile"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 text-sm font-semibold hover:bg-sky-500/25 transition-all">
              <Zap size={14} /> Donate Food via Mobile <ArrowRight size={13} />
            </Link>
          </GlassCard>

          {/* ── Sponsor a cat ── */}
          <GlassCard className="p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
                <PawPrint size={18} className="text-indigo-400" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">Sponsor a Cat</h3>
                <p className="text-text-muted text-xs">$10/month · monthly updates + digital badge</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {sponsorCats.map((cat) => (
                <div key={cat.id} className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-indigo-400/30 hover:bg-white/[0.06] transition-all">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.grad} flex items-center justify-center mb-2`}>
                    <PawPrint size={16} className="text-white" />
                  </div>
                  <p className="font-semibold text-sm text-text-primary">{cat.name}</p>
                  <p className="text-[11px] text-text-muted mb-2">{cat.id} · {cat.location}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${statusCls[cat.status as keyof typeof statusCls] ?? statusCls.Healthy}`}>
                      {cat.status}
                    </span>
                    <span className="text-[10px] text-text-muted flex items-center gap-0.5">
                      <PawPrint size={8} /> {cat.meals}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/mobile?screen=sponsor"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-accent-indigo to-accent-purple text-white text-sm font-semibold shadow-lg shadow-accent-indigo/20 hover:scale-[1.02] transition-all">
              <Heart size={14} /> Sponsor a Cat <ArrowRight size={13} />
            </Link>
          </GlassCard>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap justify-center gap-8">
          {trustItems.map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-text-muted text-sm">
              <Icon size={14} className="text-text-muted" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
