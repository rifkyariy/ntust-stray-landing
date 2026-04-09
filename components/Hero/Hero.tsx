import React from 'react'
import Button from '../Common/Button'
import GradientOrbs from '../Backgrounds/GradientOrbs'

const stats = [
  { value: '99.2%', label: 'Uptime' },
  { value: '247', label: 'Cats Tracked' },
  { value: '4.2K', label: 'Meals Served' },
  { value: '18', label: 'Smart Feeders' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg-primary grid-bg">
      <GradientOrbs />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="animate-slide-in-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-cyan/30 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-text-secondary text-sm font-medium">System Online · Real-time monitoring active</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              Smart Care for{' '}
              <span className="gradient-text">Campus Strays</span>
            </h1>

            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              An intelligent IoT ecosystem that automates feeding, monitors health, tracks populations, and empowers communities to give stray cats the care they deserve.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="primary" size="lg" href="#dashboard">
                <span>View Live Dashboard</span>
                <span>→</span>
              </Button>
              <Button variant="secondary" size="lg" href="#features">
                Explore Features
              </Button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center p-3 rounded-xl glass">
                  <div className="font-display text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-text-muted text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Feeder mockup */}
          <div className="animate-slide-in-right hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-cyan/20 to-accent-indigo/20 blur-2xl scale-110" />

              {/* Main device card */}
              <div className="relative glass-strong rounded-3xl p-8 w-80 animate-float">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-text-muted text-xs">Smart Feeder #07</p>
                    <p className="font-display font-bold text-lg">Building A</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 text-lg">✓</span>
                  </div>
                </div>

                {/* Feed level bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-text-muted mb-2">
                    <span>Feed Level</span>
                    <span className="text-accent-cyan font-semibold">78%</span>
                  </div>
                  <div className="h-2 bg-bg-primary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-indigo"
                      style={{ width: '78%' }}
                    />
                  </div>
                </div>

                {/* Vitals grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { icon: '🌡️', val: '23°C', lbl: 'Temp' },
                    { icon: '💧', val: '65%', lbl: 'Humidity' },
                    { icon: '🐱', val: '3', lbl: 'Nearby' },
                  ].map((v) => (
                    <div key={v.lbl} className="bg-bg-primary/50 rounded-xl p-3 text-center">
                      <div className="text-xl mb-1">{v.icon}</div>
                      <div className="font-semibold text-sm text-text-primary">{v.val}</div>
                      <div className="text-text-muted text-xs">{v.lbl}</div>
                    </div>
                  ))}
                </div>

                {/* Last fed */}
                <div className="flex items-center justify-between text-xs text-text-muted px-3 py-2 rounded-xl bg-bg-primary/50">
                  <span>Last fed</span>
                  <span className="text-text-secondary font-medium">2 min ago · 3 cats</span>
                </div>
              </div>

              {/* Floating notification */}
              <div className="absolute -top-4 -right-4 glass border border-green-500/30 rounded-xl px-4 py-2 text-xs font-medium text-green-400 animate-float" style={{ animationDelay: '1s' }}>
                🟢 Cat detected
              </div>
              <div className="absolute -bottom-4 -left-4 glass border border-accent-cyan/30 rounded-xl px-4 py-2 text-xs font-medium text-accent-cyan animate-float" style={{ animationDelay: '2s' }}>
                📊 Data synced
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted animate-fade-in">
        <span className="text-xs">Scroll to explore</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-accent-cyan animate-bounce" />
        </div>
      </div>
    </section>
  )
}
