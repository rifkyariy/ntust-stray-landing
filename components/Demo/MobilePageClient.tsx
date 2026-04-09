'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'

function QRCode({ value, size = 160, color = '#0ea5e9' }: { value: string; size?: number; color?: string }) {
  return (
    <div className="rounded-xl overflow-hidden p-3 bg-white inline-block">
      <QRCodeSVG
        value={value}
        size={size}
        bgColor="#ffffff"
        fgColor={color}
        level="M"
        includeMargin={false}
      />
    </div>
  )
}

// ─── Sponsored cats data ────────────────────────────────────────────────────

const cats = [
  { id: 'CAT-003', name: 'Mochi', age: '~3 yrs', location: 'Library', status: 'Healthy', meals: 127, sponsors: 4, emoji: '🐱', color: 'from-orange-400 to-amber-300' },
  { id: 'CAT-007', name: 'Shadow', age: '~5 yrs', location: 'Main Gate', status: 'Healthy', meals: 204, sponsors: 7, emoji: '😸', color: 'from-slate-400 to-slate-300' },
  { id: 'CAT-011', name: 'Cleo', age: '~2 yrs', location: 'Library', status: 'Post-TNR', meals: 89, sponsors: 2, emoji: '🐈', color: 'from-amber-600 to-yellow-400' },
  { id: 'CAT-013', name: 'Nimbus', age: '~4 yrs', location: 'Eng-A', status: 'Healthy', meals: 156, sponsors: 3, emoji: '😺', color: 'from-sky-400 to-blue-300' },
  { id: 'CAT-019', name: 'Pepper', age: '~1 yr', location: 'Main Gate', status: 'Kitten', meals: 43, sponsors: 5, emoji: '🐾', color: 'from-rose-400 to-pink-300' },
  { id: 'CAT-033', name: 'Atlas', age: '~6 yrs', location: 'Library', status: 'Senior', meals: 312, sponsors: 6, emoji: '🐱', color: 'from-violet-400 to-purple-300' },
]

// ─── Mobile phone frame shell ───────────────────────────────────────────────

function PhoneFrame({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="relative mx-auto w-[320px]">
      {/* Phone body */}
      <div className="relative bg-[#111827] rounded-[44px] border-[6px] border-slate-700 shadow-2xl shadow-black/60 overflow-hidden">
        {/* Dynamic island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" />
        {/* Screen */}
        <div className="bg-[#0f1419] overflow-hidden" style={{ height: '620px' }}>
          <div className="overflow-y-auto h-full" style={{ scrollbarWidth: 'none' }}>
            {children}
          </div>
        </div>
        {/* Home bar */}
        <div className="bg-[#111827] flex justify-center py-3">
          <div className="w-28 h-1 bg-slate-600 rounded-full" />
        </div>
      </div>
      {/* Label */}
      <p className="text-center text-xs text-slate-500 mt-3">{title}</p>
    </div>
  )
}

// ─── Donate screen ───────────────────────────────────────────────────────────

function DonateScreen() {
  const [selected, setSelected] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'food' | 'money'>('food')
  const amounts = [5, 10, 25, 50]

  return (
    <div className="px-5 pt-14 pb-6 text-white">
      {/* App header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-slate-400 text-xs">Stray Campus</p>
          <p className="font-bold text-lg leading-tight">Support the Cats 🐾</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-xs font-bold">A</div>
      </div>

      {/* Tab */}
      <div className="flex gap-1 p-1 bg-white/5 rounded-2xl mb-5">
        {(['food', 'money'] as const).map((t) => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${activeTab === t ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow' : 'text-slate-400'}`}>
            {t === 'food' ? '🍖 Donate Food' : '💰 Donate Money'}
          </button>
        ))}
      </div>

      {activeTab === 'food' ? (
        <>
          {/* Feeder picker */}
          <p className="text-xs text-slate-400 mb-2">Choose a feeder to top up</p>
          <div className="space-y-2 mb-4">
            {[
              { id: 'F-18', name: 'East Dormitory', level: 17, urgent: true },
              { id: 'F-12', name: 'Central Library', level: 44, urgent: false },
              { id: 'F-07', name: 'Engineering A', level: 78, urgent: false },
            ].map((f) => (
              <div key={f.id} className={`flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${f.urgent ? 'border-orange-500/40 bg-orange-500/10' : 'border-white/10 bg-white/5'}`}
                onClick={() => setSelected(f.urgent ? -1 : null)}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${f.urgent ? 'bg-orange-500/20' : 'bg-sky-500/15'}`}>📦</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold truncate">{f.name}</p>
                    {f.urgent && <span className="text-[9px] text-orange-400 font-bold">URGENT</span>}
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${f.level < 25 ? 'bg-orange-400' : 'bg-gradient-to-r from-sky-400 to-indigo-400'}`} style={{ width: `${f.level}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">{f.level}% remaining</p>
                </div>
              </div>
            ))}
          </div>

          {/* Food type */}
          <p className="text-xs text-slate-400 mb-2">Select food type</p>
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[{ icon: '🥩', label: 'Wet Food' }, { icon: '🌾', label: 'Dry Food' }, { icon: '🐟', label: 'Premium' }].map((f, i) => (
              <button key={f.label} onClick={() => setSelected(i)}
                className={`p-3 rounded-2xl border text-center text-xs transition-all ${selected === i ? 'border-sky-400/50 bg-sky-500/10 text-sky-300' : 'border-white/10 bg-white/5 text-slate-400'}`}>
                <div className="text-xl mb-1">{f.icon}</div>
                {f.label}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-4 text-xs text-slate-400">
            📍 Food will be dispatched within 24 hrs via our campus volunteer network.
          </div>
        </>
      ) : (
        <>
          <p className="text-xs text-slate-400 mb-2">Select amount (USD)</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {amounts.map((a) => (
              <button key={a} onClick={() => setSelected(a)}
                className={`py-4 rounded-2xl border text-sm font-bold transition-all ${selected === a ? 'border-sky-400/50 bg-sky-500/10 text-sky-300' : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'}`}>
                ${a}
              </button>
            ))}
          </div>
          {/* Custom amount */}
          <div className="flex items-center gap-2 p-3 rounded-2xl border border-white/10 bg-white/5 mb-4">
            <span className="text-slate-400 text-sm">$</span>
            <input placeholder="Custom amount" className="bg-transparent text-sm text-white placeholder-slate-600 outline-none flex-1" />
          </div>
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-4 text-xs text-indigo-300">
            💳 Processed securely via Stripe. Tax-deductible receipt sent to your email.
          </div>
        </>
      )}

      {/* QR area */}
      <div className="flex flex-col items-center gap-3 py-5 rounded-2xl border border-white/10 bg-white/[0.03]">
        <p className="text-xs text-slate-400">Scan to proceed on your device</p>
        <QRCode value={`stray-donate-${activeTab}-${selected}`} size={140} color="#0ea5e9" />
        <p className="text-[10px] text-slate-600">stray.ntust.edu.tw/donate</p>
      </div>

      {/* CTA button */}
      <button className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold text-sm shadow-lg shadow-sky-500/20 active:scale-[0.98] transition-transform">
        Donate Now ❤️
      </button>
    </div>
  )
}

// ─── Sponsor-a-Cat screen ────────────────────────────────────────────────────

function SponsorScreen() {
  const [chosen, setChosen] = useState<string | null>(null)

  if (chosen) {
    const cat = cats.find((c) => c.id === chosen)!
    return (
      <div className="px-5 pt-14 pb-6 text-white flex flex-col items-center">
        <button onClick={() => setChosen(null)} className="self-start text-xs text-slate-400 hover:text-sky-400 mb-4 flex items-center gap-1">
          ← Back
        </button>
        <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-5xl mb-4 shadow-xl`}>
          {cat.emoji}
        </div>
        <h2 className="text-2xl font-bold mb-1">{cat.name}</h2>
        <p className="text-slate-400 text-sm mb-1">{cat.id} · {cat.age} · {cat.location}</p>
        <span className={`px-3 py-1 rounded-full text-xs font-medium mb-6 ${cat.status === 'Healthy' ? 'bg-green-500/15 text-green-400' : cat.status === 'Post-TNR' ? 'bg-blue-500/15 text-blue-400' : cat.status === 'Kitten' ? 'bg-pink-500/15 text-pink-400' : 'bg-purple-500/15 text-purple-400'}`}>
          {cat.status}
        </span>

        <div className="w-full grid grid-cols-2 gap-3 mb-6">
          {[
            { icon: '🍽️', val: cat.meals, label: 'Meals eaten' },
            { icon: '👥', val: cat.sponsors, label: 'Sponsors' },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 rounded-2xl p-4 text-center border border-white/10">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-xl font-bold">{s.val}</div>
              <div className="text-[10px] text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="w-full p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-5 text-xs text-slate-400 text-center">
          Sponsoring {cat.name} sends you monthly photo updates and a digital cat badge 🏅
        </div>

        <QRCode value={`stray-sponsor-${cat.id}`} size={150} color="#6366f1" />
        <p className="text-[10px] text-slate-600 mt-2 mb-5">Scan to sponsor {cat.name}</p>

        <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
          Sponsor {cat.name} — $10/mo 💜
        </button>
      </div>
    )
  }

  return (
    <div className="px-5 pt-14 pb-6 text-white">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-slate-400 text-xs">Stray Campus</p>
          <p className="font-bold text-lg leading-tight">Sponsor a Cat 🐾</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs font-bold">A</div>
      </div>

      <p className="text-slate-400 text-xs mb-4">Choose a cat to sponsor monthly and receive updates directly to your phone.</p>

      <div className="space-y-3">
        {cats.map((cat) => (
          <button key={cat.id} onClick={() => setChosen(cat.id)}
            className="w-full flex items-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/[0.04] hover:border-indigo-400/40 hover:bg-white/[0.07] transition-all text-left group">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl flex-shrink-0 shadow`}>
              {cat.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">{cat.name}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${cat.status === 'Healthy' ? 'bg-green-500/15 text-green-400' : cat.status === 'Post-TNR' ? 'bg-blue-500/15 text-blue-400' : cat.status === 'Kitten' ? 'bg-pink-500/15 text-pink-400' : 'bg-purple-500/15 text-purple-400'}`}>
                  {cat.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">{cat.id} · {cat.age} · {cat.location}</p>
              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-600">
                <span>🍽️ {cat.meals} meals</span>
                <span>👥 {cat.sponsors} sponsors</span>
              </div>
            </div>
            <span className="text-slate-600 group-hover:text-indigo-400 transition-colors text-sm">›</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function MobilePageClient() {
  const [screen, setScreen] = useState<'donate' | 'sponsor'>('donate')

  return (
    <div className="min-h-screen bg-[#0f1419] text-slate-100">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1419]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-sm">🐾</div>
            <span className="font-bold hidden sm:block">Stray</span>
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-slate-400 text-sm">Mobile App Preview</span>
          <div className="ml-auto">
            <Link href="/demo" className="text-xs px-3 py-1.5 rounded-lg border border-white/15 text-slate-300 hover:border-sky-400/50 hover:text-sky-400 transition-all">
              ← Device Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Mobile App Preview
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Scan a QR code or browse the interactive mobile UI below. Community members can donate food, money, or sponsor a cat directly from their phone.
          </p>
        </div>

        {/* Screen selector */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-2 p-1.5 rounded-2xl border border-white/10 bg-white/[0.03]">
            {([
              { id: 'donate', icon: '❤️', label: 'Donate Food / Money' },
              { id: 'sponsor', icon: '⭐', label: 'Sponsor a Cat' },
            ] as const).map((s) => (
              <button key={s.id} onClick={() => setScreen(s.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${screen === s.id ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:text-white'}`}>
                <span>{s.icon}</span>
                <span className="hidden sm:block">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Two-column: phone + info */}
        <div className="grid lg:grid-cols-2 gap-12 items-start justify-items-center max-w-4xl mx-auto">
          {/* Phone frame */}
          <div className="lg:sticky lg:top-24">
            <PhoneFrame title={screen === 'donate' ? 'Donation Screen' : 'Sponsor-a-Cat Screen'}>
              {screen === 'donate' ? <DonateScreen /> : <SponsorScreen />}
            </PhoneFrame>
          </div>

          {/* Right info panel */}
          <div className="w-full max-w-md">
            {screen === 'donate' ? (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold mb-2">How Donations Work</h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Every donation goes directly to feeding campus strays. Food donations are routed to the feeder with the lowest supply level first, while money donations fund food procurement, vet care, and device maintenance.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: '📦', title: 'Food Donation', desc: 'Top up a specific feeder or let the system choose the most urgent one. Processed within 24 hrs via volunteer network.' },
                    { icon: '💰', title: 'Money Donation', desc: 'Any amount helps. $5 feeds one cat for a day. $25 covers a week for a feeder station.' },
                    { icon: '📱', title: 'Scan & Go', desc: 'Every screen has a QR code. Scan with any camera app to continue the flow on your own device.' },
                  ].map((s) => (
                    <div key={s.title} className="flex gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.04]">
                      <div className="text-2xl flex-shrink-0">{s.icon}</div>
                      <div>
                        <p className="font-semibold text-sm mb-1">{s.title}</p>
                        <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* QR for the donation landing */}
                <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                  <p className="text-sm font-semibold">Scan to open donation page</p>
                  <QRCode value="stray-donate-main" size={160} color="#0ea5e9" />
                  <p className="text-xs text-slate-500">stray.ntust.edu.tw/donate</p>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold mb-2">Sponsor a Cat</h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    For $10/month you adopt a specific cat digitally. You get monthly updates, a digital badge, and know exactly which cat your support is helping.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: '📸', title: 'Monthly Updates', desc: 'Receive camera-captured photos and health status reports for your sponsored cat every month.' },
                    { icon: '🏅', title: 'Digital Badge', desc: 'Show off your sponsor badge in the community app and on the public cat profile page.' },
                    { icon: '❤️', title: 'Real Impact', desc: 'Sponsorships directly fund food, vet checkups, and post-TNR monitoring for your cat.' },
                  ].map((s) => (
                    <div key={s.title} className="flex gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.04]">
                      <div className="text-2xl flex-shrink-0">{s.icon}</div>
                      <div>
                        <p className="font-semibold text-sm mb-1">{s.title}</p>
                        <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* QR for sponsor page */}
                <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                  <p className="text-sm font-semibold">Scan to browse all cats</p>
                  <QRCode value="stray-sponsor-all" size={160} color="#6366f1" />
                  <p className="text-xs text-slate-500">stray.ntust.edu.tw/sponsor</p>
                </div>

                {/* Current cats summary */}
                <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.03]">
                  <p className="text-sm font-semibold mb-3">Available to Sponsor ({cats.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {cats.map((c) => (
                      <div key={c.id} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r ${c.color} bg-opacity-10 border border-white/10`}>
                        <span className="text-sm">{c.emoji}</span>
                        <span className="text-xs font-medium text-slate-200">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
