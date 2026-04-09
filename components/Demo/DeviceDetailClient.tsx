'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import type { Device, FeedSchedule } from '@/lib/devices'

// ─── helpers ────────────────────────────────────────────────────────────────

const statusMeta = {
  online: { label: 'Online', dot: 'bg-green-400', text: 'text-green-400', badge: 'bg-green-500/15 border-green-500/30' },
  low: { label: 'Low Supply', dot: 'bg-orange-400', text: 'text-orange-400', badge: 'bg-orange-500/15 border-orange-500/30' },
  offline: { label: 'Offline', dot: 'bg-red-400', text: 'text-red-400', badge: 'bg-red-500/15 border-red-500/30' },
  maintenance: { label: 'Maintenance', dot: 'bg-yellow-400', text: 'text-yellow-400', badge: 'bg-yellow-500/15 border-yellow-500/30' },
}

function LevelArc({ value, color, label }: { value: number; color: string; label: string }) {
  const r = 36
  const circ = 2 * Math.PI * r
  const dash = (value / 100) * circ
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
        <circle
          cx="44" cy="44" r={r} fill="none"
          stroke={color} strokeWidth="7"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 44 44)"
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
        <text x="44" y="48" textAnchor="middle" fill="white" fontSize="14" fontWeight="700">{value}%</text>
      </svg>
      <span className="text-xs text-slate-500">{label}</span>
    </div>
  )
}

// ─── Camera / Detection simulation ──────────────────────────────────────────

const CAT_EMOJIS = ['🐱', '😸', '🐈', '😺', '🐾']

interface DetectionBox {
  id: string; x: number; y: number; w: number; h: number; label: string; conf: number; age: number
}

function CameraView({ deviceStatus, cameraLabel, recentCount }: { deviceStatus: string; cameraLabel: string; recentCount: number }) {
  const [boxes, setBoxes] = useState<DetectionBox[]>([])
  const [frameCount, setFrameCount] = useState(0)
  const [fps, setFps] = useState(0)
  const [totalDetected, setTotalDetected] = useState(recentCount)
  const [isRecording] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const offline = deviceStatus === 'offline' || deviceStatus === 'maintenance'

  useEffect(() => {
    if (offline) return
    const interval = setInterval(() => {
      setFrameCount((f) => f + 1)
      setFps(Math.floor(Math.random() * 3) + 24)

      // Randomly add/remove detection boxes
      setBoxes((prev) => {
        let next = prev
          .map((b) => ({ ...b, age: b.age + 1 }))
          .filter((b) => b.age < 30)

        if (Math.random() < 0.15 && next.length < 5) {
          const catId = `CAT-${String(Math.floor(Math.random() * 120)).padStart(3, '0')}`
          next = [...next, {
            id: String(Math.random()),
            x: 10 + Math.random() * 65,
            y: 15 + Math.random() * 55,
            w: 12 + Math.random() * 14,
            h: 12 + Math.random() * 14,
            label: catId,
            conf: 0.82 + Math.random() * 0.17,
            age: 0,
          }]
          setTotalDetected((t) => t + 1)
        }
        return next
      })
    }, 400)
    timerRef.current = interval
    return () => clearInterval(interval)
  }, [offline])

  if (offline) {
    return (
      <div className="relative aspect-video bg-slate-900/80 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-3 text-slate-500">
        <span className="text-4xl">📵</span>
        <p className="text-sm font-medium">Camera Offline</p>
        <p className="text-xs">{cameraLabel}</p>
      </div>
    )
  }

  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-950 aspect-video select-none">
      {/* Simulated scene background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Ground plane hint */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-700/30 to-transparent" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(14,165,233,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,.4) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Feeder silhouette */}
        <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-16 h-20 bg-slate-600/60 rounded-t-lg border border-slate-500/40 flex items-end justify-center pb-2">
          <span className="text-2xl">🍽️</span>
        </div>
      </div>

      {/* Detection boxes */}
      {boxes.map((b) => (
        <div
          key={b.id}
          className="absolute border-2 border-sky-400 rounded transition-all duration-300"
          style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%`, opacity: Math.min(1, (30 - b.age) / 8) }}
        >
          {/* Corner marks */}
          <div className="absolute -top-[2px] -left-[2px] w-3 h-3 border-t-2 border-l-2 border-sky-300" />
          <div className="absolute -top-[2px] -right-[2px] w-3 h-3 border-t-2 border-r-2 border-sky-300" />
          <div className="absolute -bottom-[2px] -left-[2px] w-3 h-3 border-b-2 border-l-2 border-sky-300" />
          <div className="absolute -bottom-[2px] -right-[2px] w-3 h-3 border-b-2 border-r-2 border-sky-300" />
          {/* Label */}
          <div className="absolute -top-5 left-0 bg-sky-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
            {b.label} {(b.conf * 100).toFixed(0)}%
          </div>
        </div>
      ))}

      {/* HUD overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left info */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded px-2 py-1 text-[10px] font-mono">
            {isRecording && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
            <span className="text-red-400 font-semibold">REC</span>
            <span className="text-slate-300 ml-1">{cameraLabel}</span>
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded px-2 py-1 text-[10px] font-mono text-slate-300">
            {fps} FPS · YOLOv8n
          </div>
        </div>

        {/* Top-right: detected count */}
        <div className="absolute top-3 right-3 bg-sky-500/20 backdrop-blur-sm border border-sky-500/40 rounded-lg px-3 py-2 text-center">
          <div className="text-sky-300 font-bold text-lg leading-none">{boxes.length}</div>
          <div className="text-sky-400/70 text-[9px] mt-0.5">CATS NOW</div>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
            <span>FRAME <span className="text-white">{frameCount.toString().padStart(5,'0')}</span></span>
            <span>CONF &gt;82%</span>
            <span>MODEL <span className="text-sky-400">EDGE</span></span>
          </div>
          <div className="text-[10px] font-mono text-slate-400">
            TOTAL TODAY <span className="text-green-400 font-semibold">{totalDetected}</span>
          </div>
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(0,0,0,1),rgba(0,0,0,1) 1px,transparent 1px,transparent 2px)' }} />
      </div>
    </div>
  )
}

// ─── Detection History ───────────────────────────────────────────────────────

function DetectionHistory({ detections }: { detections: Device['recentDetections'] }) {
  if (!detections.length) {
    return <p className="text-slate-500 text-sm py-4 text-center">No detections recorded yet</p>
  }
  return (
    <div className="space-y-2">
      {detections.map((d, i) => (
        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors">
          <div className="w-8 h-8 rounded-lg bg-sky-500/15 flex items-center justify-center text-sm flex-shrink-0">🐱</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm text-white">{d.count} cat{d.count > 1 ? 's' : ''} detected</span>
              <span className="text-xs text-slate-500 font-mono">{d.timestamp}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {d.ids.map((id) => (
                <span key={id} className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 font-mono border border-sky-500/20">{id}</span>
              ))}
            </div>
          </div>
          <div className="text-xs text-green-400 font-mono flex-shrink-0">{(d.confidence * 100).toFixed(0)}%</div>
        </div>
      ))}
    </div>
  )
}

// ─── Weekly Activity Bar Chart ───────────────────────────────────────────────

function WeeklyChart({ data }: { data: number[] }) {
  const max = Math.max(...data, 1)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return (
    <div className="flex items-end gap-2 h-20">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t bg-gradient-to-t from-sky-500/60 to-indigo-500/60 border-t border-sky-400/40 transition-all"
            style={{ height: `${(v / max) * 56}px`, minHeight: v > 0 ? '4px' : '0' }}
          />
          <span className="text-[9px] text-slate-600">{days[i]}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Feed Schedule Editor ────────────────────────────────────────────────────

function ScheduleEditor({ schedules: initial }: { schedules: FeedSchedule[] }) {
  const [schedules, setSchedules] = useState<FeedSchedule[]>(initial)
  const [saved, setSaved] = useState(false)

  const toggle = (i: number) => setSchedules((s) => s.map((x, j) => j === i ? { ...x, enabled: !x.enabled } : x))
  const setPortion = (i: number, val: number) => setSchedules((s) => s.map((x, j) => j === i ? { ...x, portion: val } : x))

  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="space-y-2 mb-4">
        {schedules.map((s, i) => (
          <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${s.enabled ? 'bg-sky-500/5 border-sky-500/20' : 'bg-white/[0.03] border-white/5 opacity-60'}`}>
            {/* Toggle */}
            <button
              onClick={() => toggle(i)}
              className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${s.enabled ? 'bg-sky-500' : 'bg-slate-700'}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${s.enabled ? 'left-[18px]' : 'left-0.5'}`} />
            </button>
            {/* Time */}
            <span className="font-mono text-sm font-semibold text-white w-12">{s.time}</span>
            {/* Portion slider */}
            <div className="flex-1 flex items-center gap-2">
              <input
                type="range" min={50} max={300} step={10}
                value={s.portion}
                onChange={(e) => setPortion(i, Number(e.target.value))}
                disabled={!s.enabled}
                className="flex-1 accent-sky-400 h-1"
              />
              <span className="text-xs text-slate-400 w-14 text-right">{s.portion}g</span>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={save}
        className={`w-full py-2 rounded-xl text-sm font-semibold transition-all ${saved ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-sky-500/15 border border-sky-500/30 text-sky-400 hover:bg-sky-500/25'}`}
      >
        {saved ? '✓ Schedule Saved' : 'Save Schedule'}
      </button>
    </div>
  )
}

// ─── Actuate Panel ───────────────────────────────────────────────────────────

function ActuatePanel({ device }: { device: Device }) {
  const [dispensing, setDispensing] = useState(false)
  const [lastDispense, setLastDispense] = useState<string | null>(null)
  const [portion, setPortion] = useState(100)
  const [log, setLog] = useState<{ time: string; msg: string; ok: boolean }[]>([])
  const disabled = device.status === 'offline' || device.status === 'maintenance'

  const dispense = () => {
    if (disabled || dispensing) return
    setDispensing(true)
    const ts = new Date().toLocaleTimeString('en-US', { hour12: false })
    setTimeout(() => {
      setDispensing(false)
      setLastDispense(ts)
      setLog((prev) => [{ time: ts, msg: `Dispensed ${portion}g · manual trigger`, ok: true }, ...prev.slice(0, 4)])
    }, 2200)
  }

  return (
    <div className="space-y-4">
      {/* Status indicator */}
      <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border ${disabled ? 'bg-slate-800/50 border-slate-700 text-slate-500' : 'bg-green-500/10 border-green-500/25 text-green-400'}`}>
        <span className={`w-2 h-2 rounded-full ${disabled ? 'bg-slate-600' : 'bg-green-400 animate-pulse'}`} />
        {disabled ? `Device ${device.status} — controls locked` : 'Device online · ready to dispense'}
      </div>

      {/* Portion control */}
      <div>
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Portion size</span>
          <span className="font-semibold text-white">{portion}g</span>
        </div>
        <input
          type="range" min={30} max={300} step={10}
          value={portion}
          onChange={(e) => setPortion(Number(e.target.value))}
          disabled={disabled}
          className="w-full accent-sky-400 h-1.5"
        />
        <div className="flex justify-between text-[10px] text-slate-600 mt-1">
          <span>30g (small)</span><span>150g (std)</span><span>300g (large)</span>
        </div>
      </div>

      {/* Dispense button */}
      <button
        onClick={dispense}
        disabled={disabled || dispensing}
        className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 relative overflow-hidden
          ${disabled ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700'
            : dispensing ? 'bg-sky-600/30 border border-sky-500/40 text-sky-300 cursor-wait'
            : 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98]'
          }`}
      >
        {dispensing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Dispensing…
          </span>
        ) : (
          '⚡ Dispense Now'
        )}
      </button>

      {/* Last dispense */}
      {lastDispense && (
        <p className="text-xs text-center text-green-400">✓ Last manual dispense at {lastDispense}</p>
      )}

      {/* Action log */}
      {log.length > 0 && (
        <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
          <p className="text-xs text-slate-500 mb-2">Recent Actions</p>
          {log.map((l, i) => (
            <div key={i} className="flex items-start gap-2 text-[11px] font-mono">
              <span className="text-slate-600">{l.time}</span>
              <span className={l.ok ? 'text-green-400' : 'text-red-400'}>✓</span>
              <span className="text-slate-400">{l.msg}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function DeviceDetailClient({ device, allDevices }: { device: Device; allDevices: Device[] }) {
  const st = statusMeta[device.status]
  const otherDevices = allDevices.filter((d) => d.id !== device.id)
  const [tab, setTab] = useState<'camera' | 'schedule' | 'actuate'>('camera')

  // Live sensor simulation
  const [liveTemp, setLiveTemp] = useState(device.temperature)
  const [liveHum, setLiveHum] = useState(device.humidity)
  useEffect(() => {
    const iv = setInterval(() => {
      setLiveTemp((t) => Math.max(18, Math.min(35, t + (Math.random() - 0.5) * 0.4)))
      setLiveHum((h) => Math.max(40, Math.min(90, h + (Math.random() - 0.5) * 0.6)))
    }, 3000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="min-h-screen bg-[#0f1419] text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1419]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-sm">🐾</div>
            <span className="font-bold hidden sm:block">Stray</span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/demo" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Devices</Link>
          <span className="text-white/20">/</span>
          <span className="text-white text-sm font-mono">{device.id}</span>
          <div className="ml-auto flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${st.badge} ${st.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${st.dot} ${device.status === 'online' ? 'animate-pulse' : ''}`} />
              {st.label}
            </span>
            <Link href="/mobile" className="text-xs px-3 py-1.5 rounded-lg border border-white/15 text-slate-300 hover:border-sky-400/50 hover:text-sky-400 transition-all hidden sm:block">
              📱 Mobile
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Device title row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
              {device.name}
              <span className="font-mono text-sm text-sky-400 font-normal">{device.id}</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">📍 {device.location} · {device.building}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>IP: {device.ipAddress}</span>
            <span>·</span>
            <span>FW: {device.firmware}</span>
            <span>·</span>
            <span>UP {device.uptime}d</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── Left column: sensor vitals + weekly chart ── */}
          <div className="flex flex-col gap-5">
            {/* Gauge row */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-sm font-semibold text-slate-300 mb-4">Supply Levels</h2>
              <div className="flex justify-around">
                <LevelArc value={device.foodLevel} color={device.foodLevel < 25 ? '#f97316' : '#0ea5e9'} label="Food" />
                <LevelArc value={device.waterLevel} color={device.waterLevel < 25 ? '#f97316' : '#6366f1'} label="Water" />
                <LevelArc value={device.batteryLevel} color={device.batteryLevel < 25 ? '#ef4444' : '#22c55e'} label="Battery" />
              </div>
            </div>

            {/* Live env sensors */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-sm font-semibold text-slate-300 mb-4">Environment · Live</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🌡️', label: 'Temperature', val: `${liveTemp.toFixed(1)}°C`, color: 'text-orange-400' },
                  { icon: '💧', label: 'Humidity', val: `${liveHum.toFixed(0)}%`, color: 'text-blue-400' },
                  { icon: '🐱', label: 'Cats Today', val: device.totalCatsToday.toString(), color: 'text-sky-400' },
                  { icon: '🍽️', label: 'Meals', val: device.totalMealsToday.toString(), color: 'text-indigo-400' },
                ].map((s) => (
                  <div key={s.label} className="bg-white/[0.04] rounded-xl p-3">
                    <div className="text-xl mb-1">{s.icon}</div>
                    <div className={`text-lg font-bold ${s.color}`}>{s.val}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly activity */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-sm font-semibold text-slate-300 mb-4">Weekly Cat Activity</h2>
              <WeeklyChart data={device.weeklyActivity} />
              <p className="text-[10px] text-slate-600 mt-3">Unique cat visits per day</p>
            </div>

            {/* Quick links to other devices */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-sm font-semibold text-slate-300 mb-3">Other Devices</h2>
              <div className="space-y-1.5">
                {otherDevices.slice(0, 4).map((d) => {
                  const s = statusMeta[d.status]
                  return (
                    <Link key={d.id} href={`/demo/${d.id}`}
                      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-colors group">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        <span className="text-xs font-mono text-sky-400">{d.id}</span>
                        <span className="text-xs text-slate-400 truncate max-w-[110px]">{d.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-600 group-hover:text-sky-400 transition-colors">→</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Center + Right columns ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Camera + Detection tabs */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
              {/* Tab bar */}
              <div className="flex border-b border-white/[0.08]">
                {([
                  { id: 'camera', icon: '📷', label: 'Camera & Detection' },
                  { id: 'schedule', icon: '🕐', label: 'Feed Schedule' },
                  { id: 'actuate', icon: '⚡', label: 'Manual Control' },
                ] as const).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-all border-b-2 ${
                      tab === t.id
                        ? 'border-sky-400 text-sky-400 bg-sky-500/5'
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span className="hidden sm:block">{t.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-5">
                {tab === 'camera' && (
                  <div className="space-y-4">
                    <CameraView
                      deviceStatus={device.status}
                      cameraLabel={device.cameraFeed}
                      recentCount={device.totalCatsToday}
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                        Detection History
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/20">{device.recentDetections.length} events</span>
                      </h3>
                      <DetectionHistory detections={device.recentDetections} />
                    </div>
                  </div>
                )}

                {tab === 'schedule' && (
                  <div>
                    <p className="text-slate-400 text-sm mb-4">
                      Configure automatic feeding times and portions. Changes apply immediately to the device.
                    </p>
                    <ScheduleEditor schedules={device.schedules} />
                    <div className="mt-5 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-500 space-y-1">
                      <p>💡 Portions above 200g are split into two sub-dispenses.</p>
                      <p>💡 Minimum 90 min gap enforced between schedules.</p>
                      <p>💡 Device re-syncs schedule every 5 minutes via MQTT.</p>
                    </div>
                  </div>
                )}

                {tab === 'actuate' && (
                  <div>
                    <p className="text-slate-400 text-sm mb-4">
                      Trigger an immediate feeding cycle outside of schedule. Useful when extra cats are detected or a volunteer is on-site.
                    </p>
                    <ActuatePanel device={device} />
                  </div>
                )}
              </div>
            </div>

            {/* Analytics summary cards */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: '👁️', label: 'Total Detections', val: device.recentDetections.reduce((a, d) => a + d.count, 0), unit: 'today' },
                { icon: '🍽️', label: 'Food Consumed', val: device.totalMealsToday * 110, unit: 'grams est.' },
                { icon: '📅', label: 'Uptime', val: device.uptime, unit: 'days' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-2xl font-bold text-white mb-0.5">{s.val}</div>
                  <div className="text-[10px] text-slate-500">{s.label}</div>
                  <div className="text-[10px] text-slate-600">{s.unit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
