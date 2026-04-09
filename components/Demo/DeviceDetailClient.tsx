'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  PawPrint, ChevronRight, Wifi, WifiOff, AlertTriangle, Wrench,
  Thermometer, Droplets, UtensilsCrossed, BatteryMedium, BatteryLow, BatteryFull,
  Camera, CameraOff, Eye, Clock, Zap, Plus, Trash2, Save, CheckCircle2,
  Activity, CalendarDays, MapPin, Cpu, Radio, ArrowRight, RefreshCw,
  TrendingUp, ShieldCheck, Package,
} from 'lucide-react'
import type { Device, FeedSchedule } from '@/lib/devices'

// ─── Status config ────────────────────────────────────────────────────────────

const statusMeta = {
  online:      { label: 'Online',      Icon: Wifi,         dot: 'bg-green-400',  text: 'text-green-400',  badge: 'bg-green-500/15 border-green-500/30' },
  low:         { label: 'Low Supply',  Icon: AlertTriangle, dot: 'bg-orange-400', text: 'text-orange-400', badge: 'bg-orange-500/15 border-orange-500/30' },
  offline:     { label: 'Offline',     Icon: WifiOff,       dot: 'bg-red-400',    text: 'text-red-400',    badge: 'bg-red-500/15 border-red-500/30' },
  maintenance: { label: 'Maintenance', Icon: Wrench,        dot: 'bg-yellow-400', text: 'text-yellow-400', badge: 'bg-yellow-500/15 border-yellow-500/30' },
}

// ─── Arc gauge ────────────────────────────────────────────────────────────────

function LevelArc({ value, color, label, Icon }: { value: number; color: string; label: string; Icon: React.ElementType }) {
  const r = 34
  const circ = 2 * Math.PI * r
  const dash = (value / 100) * circ
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width="84" height="84" viewBox="0 0 84 84">
        <circle cx="42" cy="42" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
        <circle cx="42" cy="42" r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 42 42)" style={{ transition: 'stroke-dasharray 1.2s ease' }} />
        <foreignObject x="22" y="22" width="40" height="40">
          <div className="flex flex-col items-center justify-center h-full">
            <span style={{ color, fontSize: 11, fontWeight: 700, lineHeight: 1 }}>{value}%</span>
          </div>
        </foreignObject>
      </svg>
      <div className="flex items-center gap-1 text-[11px] text-slate-400">
        <Icon size={11} />
        {label}
      </div>
    </div>
  )
}

// ─── Weekly bar chart ─────────────────────────────────────────────────────────

function WeeklyChart({ data }: { data: number[] }) {
  const max = Math.max(...data, 1)
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const today = new Date().getDay()
  const todayIdx = today === 0 ? 6 : today - 1
  return (
    <div className="flex items-end gap-1.5 h-16">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="relative w-full flex items-end justify-center" style={{ height: '44px' }}>
            <div
              className={`w-full rounded-sm transition-all ${i === todayIdx ? 'bg-sky-400' : 'bg-slate-600/70'}`}
              style={{ height: `${Math.max((v / max) * 44, v > 0 ? 3 : 0)}px` }}
            />
            {i === todayIdx && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sky-400" />
            )}
          </div>
          <span className={`text-[9px] ${i === todayIdx ? 'text-sky-400' : 'text-slate-600'}`}>{days[i]}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Camera feed ──────────────────────────────────────────────────────────────

interface DetectionBox { id: string; x: number; y: number; w: number; h: number; label: string; conf: number; age: number }

function CameraView({ deviceStatus, cameraLabel, recentCount }: { deviceStatus: string; cameraLabel: string; recentCount: number }) {
  const [boxes, setBoxes] = useState<DetectionBox[]>([])
  const [frameCount, setFrameCount] = useState(0)
  const [fps, setFps] = useState(24)
  const [totalDetected, setTotalDetected] = useState(recentCount)
  const offline = deviceStatus === 'offline' || deviceStatus === 'maintenance'

  useEffect(() => {
    if (offline) return
    const iv = setInterval(() => {
      setFrameCount(f => f + 1)
      setFps(Math.floor(Math.random() * 4) + 23)
      setBoxes(prev => {
        let next = prev.map(b => ({ ...b, age: b.age + 1 })).filter(b => b.age < 28)
        if (Math.random() < 0.14 && next.length < 4) {
          const catId = `CAT-${String(Math.floor(Math.random() * 120)).padStart(3, '0')}`
          next = [...next, { id: String(Math.random()), x: 8 + Math.random() * 62, y: 14 + Math.random() * 52, w: 11 + Math.random() * 13, h: 11 + Math.random() * 13, label: catId, conf: 0.83 + Math.random() * 0.16, age: 0 }]
          setTotalDetected(t => t + 1)
        }
        return next
      })
    }, 380)
    return () => clearInterval(iv)
  }, [offline])

  if (offline) {
    return (
      <div className="aspect-video bg-slate-900/60 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-3 text-slate-500">
        <CameraOff size={32} strokeWidth={1.5} />
        <p className="text-sm font-medium">Camera Offline</p>
        <p className="text-xs text-slate-600">{cameraLabel}</p>
      </div>
    )
  }

  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-950 aspect-video select-none">
      {/* Scene */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-700/30 to-transparent" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(14,165,233,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,.4) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Feeder silhouette */}
        <div className="absolute bottom-[26%] left-1/2 -translate-x-1/2 w-14 h-16 bg-slate-600/50 rounded-t-lg border border-slate-500/30 flex items-center justify-center">
          <UtensilsCrossed size={20} className="text-slate-400" />
        </div>
      </div>

      {/* Detection boxes */}
      {boxes.map(b => (
        <div key={b.id} className="absolute border-2 border-sky-400/90 rounded transition-all duration-300"
          style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%`, opacity: Math.min(1, (28 - b.age) / 7) }}>
          <div className="absolute -top-[2px] -left-[2px] w-3 h-3 border-t-2 border-l-2 border-sky-300" />
          <div className="absolute -top-[2px] -right-[2px] w-3 h-3 border-t-2 border-r-2 border-sky-300" />
          <div className="absolute -bottom-[2px] -left-[2px] w-3 h-3 border-b-2 border-l-2 border-sky-300" />
          <div className="absolute -bottom-[2px] -right-[2px] w-3 h-3 border-b-2 border-r-2 border-sky-300" />
          <div className="absolute -top-5 left-0 bg-sky-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
            {b.label} {(b.conf * 100).toFixed(0)}%
          </div>
        </div>
      ))}

      {/* HUD */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-sm rounded px-2 py-1 text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 font-bold">REC</span>
            <span className="text-slate-300 ml-1">{cameraLabel}</span>
          </div>
          <div className="bg-black/70 backdrop-blur-sm rounded px-2 py-1 text-[10px] font-mono text-slate-300">
            {fps} FPS · YOLOv8n
          </div>
        </div>
        <div className="absolute top-3 right-3 bg-sky-500/20 backdrop-blur-sm border border-sky-500/40 rounded-lg px-3 py-2 text-center">
          <div className="text-sky-300 font-bold text-lg leading-none">{boxes.length}</div>
          <div className="text-[9px] text-sky-400/70 mt-0.5">NOW</div>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
            <span>FRAME <span className="text-white">{frameCount.toString().padStart(5, '0')}</span></span>
            <span>CONF &gt;83%</span>
            <span>MODEL <span className="text-sky-400">EDGE</span></span>
          </div>
          <div className="text-[10px] font-mono text-slate-400">
            TODAY <span className="text-green-400 font-bold">{totalDetected}</span>
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(0,0,0,1),rgba(0,0,0,1) 1px,transparent 1px,transparent 2px)' }} />
      </div>
    </div>
  )
}

// ─── Detection history ────────────────────────────────────────────────────────

function DetectionHistory({ detections }: { detections: Device['recentDetections'] }) {
  if (!detections.length) return (
    <div className="flex flex-col items-center justify-center gap-2 py-6 text-slate-600">
      <Eye size={20} strokeWidth={1.5} />
      <p className="text-xs">No detections recorded yet</p>
    </div>
  )
  return (
    <div className="space-y-2">
      {detections.map((d, i) => (
        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors">
          <div className="w-8 h-8 rounded-lg bg-sky-500/15 flex items-center justify-center flex-shrink-0">
            <PawPrint size={14} className="text-sky-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-sm text-white">{d.count} cat{d.count > 1 ? 's' : ''} detected</span>
              <span className="text-[11px] text-slate-500 font-mono">{d.timestamp}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {d.ids.map(id => (
                <span key={id} className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 font-mono border border-sky-500/20">{id}</span>
              ))}
            </div>
          </div>
          <span className="text-[11px] text-green-400 font-mono flex-shrink-0">{(d.confidence * 100).toFixed(0)}%</span>
        </div>
      ))}
    </div>
  )
}

// ─── Feed Schedule Editor ─────────────────────────────────────────────────────

function ScheduleEditor({ schedules: initial }: { schedules: FeedSchedule[] }) {
  const [schedules, setSchedules] = useState<FeedSchedule[]>(initial)
  const [saved, setSaved] = useState(false)
  const [editingTime, setEditingTime] = useState<number | null>(null)

  const toggle = (i: number) => setSchedules(s => s.map((x, j) => j === i ? { ...x, enabled: !x.enabled } : x))
  const setPortion = (i: number, val: number) => setSchedules(s => s.map((x, j) => j === i ? { ...x, portion: val } : x))
  const setTime = (i: number, val: string) => setSchedules(s => s.map((x, j) => j === i ? { ...x, time: val } : x))
  const remove = (i: number) => setSchedules(s => s.filter((_, j) => j !== i))

  const add = () => {
    const times = schedules.map(s => s.time).sort()
    // pick a time that doesn't conflict
    const candidates = ['06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00']
    const next = candidates.find(c => !times.includes(c)) ?? '09:00'
    setSchedules(s => [...s, { time: next, portion: 100, enabled: true }])
  }

  const save = () => {
    setSaved(true)
    setEditingTime(null)
    setTimeout(() => setSaved(false), 2500)
  }

  // Sort by time for display
  const sorted = [...schedules].map((s, i) => ({ ...s, _idx: i })).sort((a, b) => a.time.localeCompare(b.time))

  return (
    <div>
      {/* Timeline view */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/10" />

        <div className="space-y-2 mb-4">
          {sorted.map((s) => {
            const i = s._idx
            return (
              <div key={i}
                className={`relative flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 ${
                  s.enabled ? 'bg-sky-500/5 border-sky-500/20' : 'bg-white/[0.02] border-white/5 opacity-50'
                }`}>
                {/* Timeline dot */}
                <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
                  s.enabled ? 'border-sky-500 bg-sky-500/15' : 'border-slate-700 bg-slate-800'
                }`}>
                  <Clock size={13} className={s.enabled ? 'text-sky-400' : 'text-slate-600'} />
                </div>

                <div className="flex-1 min-w-0 pt-1">
                  {/* Time + portion row */}
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    {editingTime === i ? (
                      <input
                        type="time"
                        value={s.time}
                        onChange={e => setTime(i, e.target.value)}
                        onBlur={() => setEditingTime(null)}
                        autoFocus
                        className="font-mono text-sm font-bold bg-slate-800 border border-sky-500/50 rounded-lg px-2 py-1 text-sky-300 outline-none w-28"
                      />
                    ) : (
                      <button
                        onClick={() => setEditingTime(i)}
                        className="font-mono text-sm font-bold text-white hover:text-sky-300 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                      >
                        {s.time}
                      </button>
                    )}
                    <span className="text-xs text-slate-500">·</span>
                    <span className={`text-xs font-semibold ${s.enabled ? 'text-sky-400' : 'text-slate-500'}`}>{s.portion}g</span>

                    <div className="ml-auto flex items-center gap-2">
                      {/* Toggle */}
                      <button onClick={() => toggle(i)}
                        className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${s.enabled ? 'bg-sky-500' : 'bg-slate-700'}`}>
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${s.enabled ? 'left-[18px]' : 'left-0.5'}`} />
                      </button>
                      {/* Delete */}
                      <button onClick={() => remove(i)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Portion slider */}
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed size={10} className="text-slate-600 flex-shrink-0" />
                    <input
                      type="range" min={30} max={300} step={10}
                      value={s.portion}
                      onChange={e => setPortion(i, Number(e.target.value))}
                      disabled={!s.enabled}
                      className="flex-1 accent-sky-400 h-1 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div className="flex gap-px text-[9px] text-slate-600 w-16 justify-end">
                      <span>30</span><span className="mx-0.5">–</span><span>300g</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add + Save row */}
      <div className="flex gap-2 mt-3">
        <button onClick={add}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-white/20 text-slate-400 hover:border-sky-500/40 hover:text-sky-400 hover:bg-sky-500/5 transition-all text-sm flex-1">
          <Plus size={14} />
          Add Schedule
        </button>
        <button onClick={save}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            saved
              ? 'bg-green-500/20 border border-green-500/30 text-green-400'
              : 'bg-sky-500/15 border border-sky-500/30 text-sky-400 hover:bg-sky-500/25'
          }`}>
          {saved ? <><CheckCircle2 size={14} /> Saved</> : <><Save size={14} /> Save</>}
        </button>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-white/[0.025] border border-white/[0.05] space-y-1 text-[11px] text-slate-600">
        <div className="flex items-center gap-1.5"><ShieldCheck size={10} /> Portions above 200g are split into two sub-dispenses</div>
        <div className="flex items-center gap-1.5"><Radio size={10} /> Device re-syncs schedule every 5 min via MQTT</div>
        <div className="flex items-center gap-1.5"><Clock size={10} /> Min 90 min gap between schedules enforced</div>
      </div>
    </div>
  )
}

// ─── Actuate panel ────────────────────────────────────────────────────────────

function ActuatePanel({ device }: { device: Device }) {
  const [dispensing, setDispensing] = useState(false)
  const [portion, setPortion] = useState(100)
  const [log, setLog] = useState<{ time: string; grams: number }[]>([])
  const disabled = device.status === 'offline' || device.status === 'maintenance'

  const dispense = () => {
    if (disabled || dispensing) return
    setDispensing(true)
    const ts = new Date().toLocaleTimeString('en-US', { hour12: false })
    setTimeout(() => {
      setDispensing(false)
      setLog(prev => [{ time: ts, grams: portion }, ...prev.slice(0, 4)])
    }, 2200)
  }

  return (
    <div className="space-y-4">
      {/* Status pill */}
      <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium ${
        disabled ? 'bg-slate-800/50 border-slate-700 text-slate-500' : 'bg-green-500/10 border-green-500/25 text-green-400'
      }`}>
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${disabled ? 'bg-slate-600' : 'bg-green-400 animate-pulse'}`} />
        {disabled ? `Device ${device.status} — controls locked` : 'Device online · ready to dispense'}
      </div>

      {/* Portion presets */}
      <div>
        <p className="text-xs text-slate-500 mb-2">Quick portions</p>
        <div className="grid grid-cols-4 gap-2">
          {[50, 100, 150, 200].map(g => (
            <button key={g} onClick={() => setPortion(g)} disabled={disabled}
              className={`py-2 rounded-xl border text-xs font-semibold transition-all ${
                portion === g ? 'border-sky-500/50 bg-sky-500/15 text-sky-300' : 'border-white/10 bg-white/[0.04] text-slate-400 hover:border-white/20 disabled:opacity-40'
              }`}>
              {g}g
            </button>
          ))}
        </div>
      </div>

      {/* Slider */}
      <div>
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Custom portion</span>
          <span className="font-bold text-white">{portion}g</span>
        </div>
        <input type="range" min={30} max={300} step={10} value={portion}
          onChange={e => setPortion(Number(e.target.value))} disabled={disabled}
          className="w-full accent-sky-400 h-1.5" />
        <div className="flex justify-between text-[10px] text-slate-700 mt-1">
          <span>30g</span><span>150g</span><span>300g</span>
        </div>
      </div>

      {/* Big dispense button */}
      <button onClick={dispense} disabled={disabled || dispensing}
        className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
          disabled
            ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700'
            : dispensing
            ? 'bg-sky-600/20 border border-sky-500/30 text-sky-300 cursor-wait'
            : 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 hover:scale-[1.02] active:scale-[0.98]'
        }`}>
        {dispensing ? (
          <><RefreshCw size={16} className="animate-spin" /> Dispensing {portion}g…</>
        ) : (
          <><Zap size={16} /> Dispense {portion}g Now</>
        )}
      </button>

      {/* Action log */}
      {log.length > 0 && (
        <div className="space-y-1.5 pt-3 border-t border-white/[0.06]">
          <p className="text-[11px] text-slate-600 flex items-center gap-1.5 mb-2"><Activity size={10} /> Recent manual dispenses</p>
          {log.map((l, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] font-mono px-2 py-1 rounded-lg bg-white/[0.03]">
              <CheckCircle2 size={10} className="text-green-400 flex-shrink-0" />
              <span className="text-slate-600">{l.time}</span>
              <span className="text-slate-400 flex-1">Manual dispense</span>
              <span className="text-sky-400">{l.grams}g</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DeviceDetailClient({ device, allDevices }: { device: Device; allDevices: Device[] }) {
  const st = statusMeta[device.status]
  const StatusIcon = st.Icon
  const otherDevices = allDevices.filter(d => d.id !== device.id)

  const [liveTemp, setLiveTemp] = useState(device.temperature)
  const [liveHum, setLiveHum] = useState(device.humidity)
  useEffect(() => {
    const iv = setInterval(() => {
      setLiveTemp(t => Math.max(18, Math.min(35, t + (Math.random() - 0.5) * 0.4)))
      setLiveHum(h => Math.max(40, Math.min(90, h + (Math.random() - 0.5) * 0.6)))
    }, 3000)
    return () => clearInterval(iv)
  }, [])

  const BattIcon = device.batteryLevel < 25 ? BatteryLow : device.batteryLevel < 60 ? BatteryMedium : BatteryFull

  return (
    <div className="min-h-screen bg-[#0f1419] text-slate-100">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1419]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg">
              <PawPrint size={15} className="text-white" />
            </div>
            <span className="font-bold hidden sm:block">Stray</span>
          </Link>
          <ChevronRight size={14} className="text-white/20" />
          <Link href="/demo" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Devices</Link>
          <ChevronRight size={14} className="text-white/20" />
          <span className="text-white text-sm font-mono font-semibold">{device.id}</span>

          <div className="ml-auto flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${st.badge} ${st.text}`}>
              <StatusIcon size={10} />
              {st.label}
            </span>
            <Link href="/mobile" className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-white/15 text-slate-300 hover:border-sky-400/50 hover:text-sky-400 transition-all">
              <Cpu size={12} /> Mobile
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* ── Title row ── */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold">{device.name}</h1>
              <span className="font-mono text-sm text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-lg border border-sky-500/20">{device.id}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
              <MapPin size={13} />
              <span>{device.location}</span>
              <span className="text-white/20">·</span>
              <span>{device.building}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600 font-mono bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2">
            <span className="flex items-center gap-1"><Cpu size={10} /> {device.ipAddress}</span>
            <span className="text-white/10">·</span>
            <span className="flex items-center gap-1"><Package size={10} /> {device.firmware}</span>
            <span className="text-white/10">·</span>
            <span className="flex items-center gap-1"><Activity size={10} /> {device.uptime}d uptime</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* Row 1: Supply gauges + Env sensors + Weekly chart                 */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Supply gauges */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Package size={12} /> Supply Levels
            </h2>
            <div className="flex justify-around">
              <LevelArc value={device.foodLevel}    color={device.foodLevel    < 25 ? '#f97316' : '#0ea5e9'} label="Food"    Icon={UtensilsCrossed} />
              <LevelArc value={device.waterLevel}   color={device.waterLevel   < 25 ? '#f97316' : '#6366f1'} label="Water"   Icon={Droplets} />
              <LevelArc value={device.batteryLevel} color={device.batteryLevel < 25 ? '#ef4444' : '#22c55e'} label="Battery" Icon={BattIcon} />
            </div>
          </div>

          {/* Env sensors */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Activity size={12} /> Environment · Live
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { Icon: Thermometer,    label: 'Temperature', val: `${liveTemp.toFixed(1)}°C`, color: 'text-orange-400' },
                { Icon: Droplets,       label: 'Humidity',    val: `${liveHum.toFixed(0)}%`,   color: 'text-blue-400'   },
                { Icon: PawPrint,       label: 'Cats Today',  val: String(device.totalCatsToday),  color: 'text-sky-400'    },
                { Icon: UtensilsCrossed,label: 'Meals',       val: String(device.totalMealsToday), color: 'text-indigo-400' },
              ].map(s => (
                <div key={s.label} className="bg-white/[0.04] rounded-xl p-3 flex flex-col gap-1">
                  <s.Icon size={14} className="text-slate-500" />
                  <div className={`text-xl font-bold ${s.color}`}>{s.val}</div>
                  <div className="text-[10px] text-slate-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly chart */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <TrendingUp size={12} /> Weekly Activity
            </h2>
            <WeeklyChart data={device.weeklyActivity} />
            <p className="text-[10px] text-slate-600 mt-3 flex items-center gap-1">
              <PawPrint size={9} /> Unique cat visits per day
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* Row 2: Camera feed (wide) + Detection history                     */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Camera — spans 3 cols */}
          <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Camera size={12} /> Camera · {device.cameraFeed}
            </h2>
            <CameraView
              deviceStatus={device.status}
              cameraLabel={device.cameraFeed}
              recentCount={device.totalCatsToday}
            />
          </div>

          {/* Detection history — spans 2 cols */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] p-5 flex flex-col">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Eye size={12} /> Detection History
              <span className="ml-auto text-[10px] bg-sky-500/15 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full">
                {device.recentDetections.length} events
              </span>
            </h2>
            <div className="flex-1 overflow-y-auto">
              <DetectionHistory detections={device.recentDetections} />
            </div>
            {/* Analytics summary */}
            <div className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-2">
              {[
                { Icon: Eye,            label: 'Detections', val: device.recentDetections.reduce((a, d) => a + d.count, 0) },
                { Icon: UtensilsCrossed,label: 'Consumed',   val: `${device.totalMealsToday * 110}g` },
                { Icon: CalendarDays,   label: 'Uptime',     val: `${device.uptime}d` },
              ].map(s => (
                <div key={s.label} className="text-center bg-white/[0.04] rounded-xl p-2.5">
                  <s.Icon size={14} className="mx-auto mb-1 text-slate-500" />
                  <div className="text-sm font-bold text-white">{s.val}</div>
                  <div className="text-[9px] text-slate-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* Row 3: Feed Schedule + Manual Control                             */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Feed Schedule */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Clock size={12} /> Feed Schedule
            </h2>
            <p className="text-[11px] text-slate-600 mb-4">Click a time to edit · drag slider for portion · toggle to enable/disable</p>
            <ScheduleEditor schedules={device.schedules} />
          </div>

          {/* Manual Control */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Zap size={12} /> Manual Control
            </h2>
            <p className="text-[11px] text-slate-600 mb-4">Trigger immediate feeding outside of schedule</p>
            <ActuatePanel device={device} />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* Row 4: Other devices                                              */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Radio size={12} /> Other Devices
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {otherDevices.map(d => {
              const s = statusMeta[d.status]
              const SI = s.Icon
              return (
                <Link key={d.id} href={`/demo/${d.id}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all group">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono text-sky-400">{d.id}</p>
                    <p className="text-[11px] text-slate-400 truncate">{d.name}</p>
                  </div>
                  <ArrowRight size={12} className="text-slate-700 group-hover:text-sky-400 transition-colors" />
                </Link>
              )
            })}
          </div>
        </div>

      </main>
    </div>
  )
}
