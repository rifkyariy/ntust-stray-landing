import React from 'react'
import GlassCard from '../Common/GlassCard'

const features = [
  {
    icon: '🤖',
    title: 'Automated Feeding',
    description: 'AI-scheduled dispensers release precise portions based on time, detected cats, and environmental conditions.',
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    icon: '📷',
    title: 'Vision Detection',
    description: 'Edge-AI cameras identify individual cats, count populations, and detect health anomalies in real time.',
    color: 'from-indigo-500/20 to-purple-500/20',
  },
  {
    icon: '🏥',
    title: 'Health Monitoring',
    description: 'Continuous tracking of weight, activity patterns, and behavioral changes to flag medical needs early.',
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    icon: '📊',
    title: 'Population Analytics',
    description: 'Track colony demographics, territory mapping, and trend analysis with interactive dashboards.',
    color: 'from-orange-500/20 to-amber-500/20',
  },
  {
    icon: '📱',
    title: 'Mobile App',
    description: 'Full-featured iOS and Android app for real-time alerts, feeder control, and cat sponsorship.',
    color: 'from-pink-500/20 to-rose-500/20',
  },
  {
    icon: '🌐',
    title: 'Web Dashboard',
    description: 'Comprehensive admin panel with live maps, device management, and reporting tools.',
    color: 'from-violet-500/20 to-indigo-500/20',
  },
  {
    icon: '🔔',
    title: 'Smart Alerts',
    description: 'Instant notifications for low food levels, unusual activity, health concerns, or device issues.',
    color: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    icon: '♻️',
    title: 'TNR Integration',
    description: 'Trap-Neuter-Return workflow management with scheduling, tagging, and post-surgery monitoring.',
    color: 'from-teal-500/20 to-cyan-500/20',
  },
  {
    icon: '🤝',
    title: 'Community Hub',
    description: 'Volunteer coordination, donation management, sponsor-a-cat programs, and public cat profiles.',
    color: 'from-purple-500/20 to-pink-500/20',
  },
]

export default function FeatureGrid() {
  return (
    <section id="features" className="py-24 px-6 bg-bg-primary relative overflow-hidden">
      {/* Subtle orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-accent-cyan/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-indigo/30 mb-6">
            <span className="text-accent-indigo text-sm font-medium">Core Features</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Care for Strays</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A complete ecosystem of 9 integrated features working together to automate care, improve welfare, and build community.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <GlassCard
              key={f.title}
              hover
              className="p-6 group"
              style={{ animationDelay: `${i * 0.1}s` } as React.CSSProperties}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="font-display font-semibold text-lg text-text-primary mb-2">{f.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{f.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
