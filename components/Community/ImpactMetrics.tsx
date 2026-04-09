'use client'

import React, { useEffect, useRef, useState } from 'react'

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const step = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

const metrics = [
  { value: 247, suffix: '', label: 'Cats Tracked', icon: '🐱', desc: 'Individual cats identified and profiled' },
  { value: 4200, suffix: '+', label: 'Meals Served', icon: '🍽️', desc: 'Automated feedings completed this month' },
  { value: 18, suffix: '', label: 'Smart Feeders', icon: '📦', desc: 'IoT devices deployed across campus' },
  { value: 99, suffix: '%', label: 'System Uptime', icon: '✅', desc: 'Reliability over the past 12 months' },
  { value: 312, suffix: '', label: 'Volunteers', icon: '🤝', desc: 'Active community members' },
  { value: 58, suffix: '', label: 'TNR Completed', icon: '💉', desc: 'Cats neutered and returned this year' },
]

function MetricCard({ metric }: { metric: typeof metrics[0] }) {
  const { count, ref } = useCountUp(metric.value)
  return (
    <div ref={ref} className="p-6 glass rounded-2xl border border-white/10 hover:border-accent-cyan/30 transition-all hover:-translate-y-1 text-center group">
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{metric.icon}</div>
      <div className="font-display text-4xl font-bold gradient-text mb-1">
        {count.toLocaleString()}{metric.suffix}
      </div>
      <div className="font-semibold text-text-primary text-sm mb-1">{metric.label}</div>
      <div className="text-text-muted text-xs">{metric.desc}</div>
    </div>
  )
}

const testimonials = [
  {
    quote: "The smart feeders have completely changed how we care for campus cats. Real-time monitoring means we never miss a hungry cat again.",
    name: "Dr. Chen Wei",
    role: "Campus Sustainability Officer",
    avatar: "CW",
  },
  {
    quote: "As a volunteer, the mobile app makes it so easy to coordinate with other caregivers. The TNR tracking feature alone has saved us countless hours.",
    name: "Lin Mei-Ling",
    role: "Volunteer Coordinator",
    avatar: "LM",
  },
  {
    quote: "The health anomaly detection caught early signs of illness in three cats last semester. This technology is genuinely saving lives.",
    name: "Prof. Huang Yu",
    role: "Animal Welfare Researcher",
    avatar: "HY",
  },
]

export default function ImpactMetrics() {
  return (
    <section id="impact" className="py-24 px-6 bg-bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-accent-cyan/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/30 mb-6">
            <span className="text-green-400 text-sm font-medium">Real Impact</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Measurable{' '}
            <span className="gradient-text">Outcomes</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Numbers that represent real cats cared for, communities built, and lives improved.
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
          {metrics.map((m) => <MetricCard key={m.label} metric={m} />)}
        </div>

        {/* Testimonials */}
        <div id="community">
          <h3 className="font-display text-2xl font-bold text-center mb-8">
            What Our Community Says
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 glass rounded-2xl border border-white/10 hover:border-accent-indigo/30 transition-all">
                <p className="text-text-secondary text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-cyan to-accent-indigo flex items-center justify-center text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary text-sm">{t.name}</p>
                    <p className="text-text-muted text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
