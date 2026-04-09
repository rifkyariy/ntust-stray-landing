import React from 'react'
import {
  UtensilsCrossed, Camera, HeartPulse, BarChart3, Smartphone,
  LayoutDashboard, BellRing, Syringe, Users,
} from 'lucide-react'
import GlassCard from '../Common/GlassCard'

const features = [
  {
    Icon: UtensilsCrossed,
    title: 'Scheduled Feeding',
    description: 'Configure time-based dispense schedules per feeder directly from the dashboard. Portions are adjustable in real time via MQTT — no on-site visit needed.',
    grad: 'from-cyan-500/20 to-blue-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    Icon: Camera,
    title: 'Edge-AI Detection',
    description: 'Each feeder runs YOLOv8 on a Raspberry Pi 4, detecting and identifying individual cats frame-by-frame. Bounding boxes, confidence scores, and cat IDs stream live to the dashboard.',
    grad: 'from-indigo-500/20 to-purple-500/20',
    iconColor: 'text-indigo-400',
  },
  {
    Icon: HeartPulse,
    title: 'Health Monitoring',
    description: 'Activity patterns, visit frequency, and behavioral changes are tracked per cat ID over time. Anomalies trigger automatic alerts so caregivers can act early.',
    grad: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
  },
  {
    Icon: BarChart3,
    title: 'Population Analytics',
    description: 'Weekly activity charts, per-feeder visit counts, and colony trend analysis — all derived from detection data and visible on the device detail page.',
    grad: 'from-orange-500/20 to-amber-500/20',
    iconColor: 'text-orange-400',
  },
  {
    Icon: Smartphone,
    title: 'Mobile Donation',
    description: 'Anyone on campus can scan a QR code to donate food to the most urgent feeder or sponsor an individual cat for monthly updates. No app download required.',
    grad: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-pink-400',
  },
  {
    Icon: LayoutDashboard,
    title: 'Unified Dashboard',
    description: 'All 6 feeders on a single screen with supply level bars, status badges, cat counts, and battery readings. Click any feeder for full device detail and camera feed.',
    grad: 'from-violet-500/20 to-indigo-500/20',
    iconColor: 'text-violet-400',
  },
  {
    Icon: BellRing,
    title: 'Smart Alerts',
    description: 'Low food, low water, low battery, offline device — each condition generates a real-time alert visible in the dashboard and pushed to mobile. Urgent feeders are highlighted automatically.',
    grad: 'from-yellow-500/20 to-orange-500/20',
    iconColor: 'text-yellow-400',
  },
  {
    Icon: Syringe,
    title: 'TNR Workflow',
    description: 'Trap-Neuter-Return scheduling, post-surgery monitoring tags, and return tracking are integrated into cat profiles so the full lifecycle is managed in one place.',
    grad: 'from-teal-500/20 to-cyan-500/20',
    iconColor: 'text-teal-400',
  },
  {
    Icon: Users,
    title: 'Community Tools',
    description: 'Volunteer coordination, sponsor-a-cat profiles, and public cat pages drive community participation and make the system self-sustaining without relying on institutional funding alone.',
    grad: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
]

export default function FeatureGrid() {
  return (
    <section id="features" className="py-24 px-6 bg-bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-accent-cyan/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-indigo/30 mb-6">
            <BarChart3 size={13} className="text-accent-indigo" />
            <span className="text-accent-indigo text-sm font-medium">Platform Capabilities</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Built for the Full{' '}
            <span className="gradient-text">Care Lifecycle</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            From automated dispensing to community fundraising — every feature in Stray is tied to a measurable outcome visible in the live system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <GlassCard key={f.title} hover className="p-6 group"
              style={{ animationDelay: `${i * 0.07}s` } as React.CSSProperties}>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.grad} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <f.Icon size={19} className={f.iconColor} />
              </div>
              <h3 className="font-display font-semibold text-base text-text-primary mb-2">{f.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{f.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
