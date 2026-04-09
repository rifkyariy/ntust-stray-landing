'use client'

import React, { useState } from 'react'
import GlassCard from '../Common/GlassCard'

const tiers = [
  {
    id: 'edge',
    number: '01',
    label: 'Edge Layer',
    title: 'Smart Hardware',
    icon: '📡',
    color: 'accent-cyan',
    gradient: 'from-cyan-500 to-blue-500',
    description: 'IoT devices deployed on campus that collect data, dispense food, and perform local AI inference.',
    components: [
      { name: 'Smart Feeder v2', desc: 'WiFi-enabled dispenser with load cell and cam' },
      { name: 'Edge AI Module', desc: 'Raspberry Pi 4 running YOLOv8 cat detection' },
      { name: 'Environment Sensor', desc: 'Temp, humidity, motion, IR presence' },
      { name: 'LoRa Gateway', desc: 'Long-range mesh for remote feeder locations' },
    ],
    specs: ['MQTT Protocol', 'TLS 1.3 Encrypted', '<100ms Latency', 'OTA Updates'],
  },
  {
    id: 'cloud',
    number: '02',
    label: 'Cloud Layer',
    title: 'Backend Services',
    icon: '☁️',
    color: 'accent-indigo',
    gradient: 'from-indigo-500 to-purple-500',
    description: 'Scalable microservices handling data ingestion, AI processing, storage, and business logic.',
    components: [
      { name: 'API Gateway', desc: 'REST + WebSocket endpoints, rate limiting' },
      { name: 'ML Pipeline', desc: 'Cat recognition, health scoring, anomaly detection' },
      { name: 'Time-Series DB', desc: 'InfluxDB for sensor telemetry at scale' },
      { name: 'Event Bus', desc: 'Kafka for real-time event streaming & alerts' },
    ],
    specs: ['Kubernetes', 'Auto-scaling', '99.9% SLA', 'Multi-region'],
  },
  {
    id: 'app',
    number: '03',
    label: 'App Layer',
    title: 'User Interfaces',
    icon: '📱',
    color: 'accent-purple',
    gradient: 'from-purple-500 to-pink-500',
    description: 'Intuitive web and mobile apps that surface insights and let users interact with the system.',
    components: [
      { name: 'Web Dashboard', desc: 'Next.js admin panel with real-time maps' },
      { name: 'Mobile App', desc: 'React Native for iOS & Android' },
      { name: 'Public Portal', desc: 'Cat profiles, sponsorship, community feed' },
      { name: 'Analytics Suite', desc: 'Grafana dashboards + custom reports' },
    ],
    specs: ['React 18', 'TypeScript', 'PWA', '95+ Lighthouse'],
  },
]

export default function ArchitectureTiers() {
  const [active, setActive] = useState('edge')
  const tier = tiers.find((t) => t.id === active)!

  return (
    <section id="architecture" className="py-24 px-6 bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-purple/30 mb-6">
            <span className="text-accent-purple text-sm font-medium">System Architecture</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Three-Tier{' '}
            <span className="gradient-text">IoT Architecture</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A robust, scalable design connecting physical hardware to intelligent cloud services and user-facing applications.
          </p>
        </div>

        {/* Tier tabs */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {tiers.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex-1 p-5 rounded-2xl border text-left transition-all duration-300 ${
                active === t.id
                  ? 'bg-white/10 border-white/20 shadow-lg'
                  : 'glass border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{t.icon}</span>
                <div>
                  <p className={`text-xs font-medium text-${t.color}`}>{t.label}</p>
                  <p className="font-display font-semibold text-text-primary">{t.title}</p>
                </div>
              </div>
              <p className="text-text-muted text-xs line-clamp-2">{t.description}</p>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <GlassCard intensity="strong" className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Components */}
            <div>
              <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <span>{tier.icon}</span>
                <span>{tier.title} Components</span>
              </h3>
              <div className="flex flex-col gap-3">
                {tier.components.map((c) => (
                  <div key={c.name} className="flex gap-4 p-4 rounded-xl bg-bg-primary/40 hover:bg-bg-primary/60 transition-colors">
                    <div className={`w-2 rounded-full bg-gradient-to-b ${tier.gradient} self-stretch`} />
                    <div>
                      <p className="font-medium text-text-primary text-sm">{c.name}</p>
                      <p className="text-text-muted text-xs mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div>
              <h3 className="font-display font-semibold text-lg mb-4">Tech Specs</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {tier.specs.map((s) => (
                  <div key={s} className="flex items-center gap-2 p-3 rounded-xl bg-bg-primary/40">
                    <span className="w-2 h-2 rounded-full bg-accent-cyan" />
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
