'use client'

import React, { useState } from 'react'
import { Radio, Cloud, LayoutDashboard, CheckCircle2 } from 'lucide-react'
import GlassCard from '../Common/GlassCard'

const tiers = [
  {
    id: 'edge',
    label: 'Edge Layer',
    title: 'Smart Hardware',
    Icon: Radio,
    iconColor: 'text-cyan-400',
    color: 'text-cyan-400',
    activeBorder: 'border-cyan-500/40 bg-cyan-500/5',
    gradient: 'from-cyan-500 to-blue-500',
    description: 'IoT devices deployed at fixed campus locations. Each unit collects sensor data, runs on-device cat detection, and dispenses food on a configurable schedule — all without a cloud round-trip.',
    components: [
      { name: 'Smart Feeder v2',    desc: 'WiFi dispenser with load-cell food measurement and integrated cam mount' },
      { name: 'Edge AI Module',     desc: 'Raspberry Pi 4 running YOLOv8n — detects, counts, and IDs cats in real time' },
      { name: 'Environment Sensor', desc: 'Temp, humidity, motion, and IR presence — feeds the live env panel in the dashboard' },
      { name: 'LoRa Gateway',       desc: 'Long-range mesh for feeders placed beyond campus WiFi coverage' },
    ],
    specs: ['MQTT over TLS 1.3', '<100 ms local latency', 'OTA firmware updates', 'Offline-resilient'],
  },
  {
    id: 'cloud',
    label: 'Cloud Layer',
    title: 'Backend Services',
    Icon: Cloud,
    iconColor: 'text-indigo-400',
    color: 'text-indigo-400',
    activeBorder: 'border-indigo-500/40 bg-indigo-500/5',
    gradient: 'from-indigo-500 to-purple-500',
    description: 'Stateless microservices that ingest telemetry, run ML pipelines, persist time-series data, and push real-time events to connected dashboards and mobile clients.',
    components: [
      { name: 'API Gateway',    desc: 'REST + WebSocket endpoints consumed by the web and mobile apps' },
      { name: 'ML Pipeline',   desc: 'Cat re-ID, health scoring, and anomaly detection running post-edge' },
      { name: 'InfluxDB',      desc: 'Time-series store for all sensor telemetry — powers the weekly charts' },
      { name: 'Kafka Bus',     desc: 'Event streaming for real-time alerts, feeder state changes, and dispense logs' },
    ],
    specs: ['Kubernetes autoscale', '99.9 % SLA', 'Multi-region failover', 'Prometheus metrics'],
  },
  {
    id: 'app',
    label: 'App Layer',
    title: 'User Interfaces',
    Icon: LayoutDashboard,
    iconColor: 'text-purple-400',
    color: 'text-purple-400',
    activeBorder: 'border-purple-500/40 bg-purple-500/5',
    gradient: 'from-purple-500 to-pink-500',
    description: 'The interfaces you can explore right now — the device management dashboard, device detail pages with live camera feeds and schedule editors, and the mobile donation portal.',
    components: [
      { name: 'Device Dashboard',  desc: '/demo — all feeders at a glance with status, supply, and cat counts' },
      { name: 'Device Detail',     desc: '/demo/[id] — camera feed, detection history, schedule editor, manual control' },
      { name: 'Mobile Portal',     desc: '/mobile — QR-based food and money donation, sponsor-a-cat flow' },
      { name: 'Analytics Suite',   desc: 'Weekly activity charts, per-feeder consumption estimates, uptime tracking' },
    ],
    specs: ['Next.js 14 + TypeScript', 'Lucide icon system', 'Real-time WebSocket', '95+ Lighthouse'],
  },
]

export default function ArchitectureTiers() {
  const [active, setActive] = useState('edge')
  const tier = tiers.find((t) => t.id === active)!

  return (
    <section id="architecture" className="py-24 px-6 bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-purple/30 mb-6">
            <Radio size={13} className="text-accent-purple" />
            <span className="text-accent-purple text-sm font-medium">How It Works</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Three-Tier{' '}
            <span className="gradient-text">IoT Architecture</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Physical hardware on campus feeds data to a cloud backend, which drives the web and mobile interfaces you can explore today.
          </p>
        </div>

        {/* Tier tabs */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {tiers.map((t) => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className={`flex-1 p-5 rounded-2xl border text-left transition-all duration-300 ${
                active === t.id ? t.activeBorder : 'glass border-white/5 hover:border-white/15'
              }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${t.gradient} bg-opacity-20 flex items-center justify-center`}>
                  <t.Icon size={16} className="text-white" />
                </div>
                <div>
                  <p className={`text-xs font-medium ${t.color}`}>{t.label}</p>
                  <p className="font-display font-semibold text-text-primary text-sm">{t.title}</p>
                </div>
              </div>
              <p className="text-text-muted text-xs line-clamp-2">{t.description}</p>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <GlassCard intensity="strong" className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <tier.Icon size={18} className={tier.iconColor} />
                {tier.title} Components
              </h3>
              <div className="flex flex-col gap-3">
                {tier.components.map((c) => (
                  <div key={c.name} className="flex gap-4 p-4 rounded-xl bg-bg-primary/40 hover:bg-bg-primary/60 transition-colors">
                    <div className={`w-1.5 rounded-full bg-gradient-to-b ${tier.gradient} self-stretch flex-shrink-0`} />
                    <div>
                      <p className="font-medium text-text-primary text-sm">{c.name}</p>
                      <p className="text-text-muted text-xs mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display font-semibold text-lg mb-4">Technical Specs</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {tier.specs.map((s) => (
                  <div key={s} className="flex items-center gap-2 p-3 rounded-xl bg-bg-primary/40">
                    <CheckCircle2 size={13} className="text-accent-cyan flex-shrink-0" />
                    <span className="text-sm text-text-secondary">{s}</span>
                  </div>
                ))}
              </div>
              <p className="text-text-muted text-sm leading-relaxed">{tier.description}</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
