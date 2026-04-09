import React from 'react'
import Button from '../Common/Button'
import GlassCard from '../Common/GlassCard'

const tiers = [
  {
    name: 'Supporter',
    price: '$5',
    period: '/month',
    icon: '❤️',
    perks: ['Name on donor wall', 'Monthly newsletter', 'Virtual cat badge'],
    color: 'border-text-muted/20',
  },
  {
    name: 'Cat Parent',
    price: '$20',
    period: '/month',
    icon: '⭐',
    perks: ['Sponsor a specific cat', 'Monthly photo updates', 'Priority app access', 'Exclusive Discord'],
    color: 'border-accent-cyan/40',
    featured: true,
  },
  {
    name: 'Colony Guardian',
    price: '$50',
    period: '/month',
    icon: '👑',
    perks: ['Sponsor a full feeder', 'Nameplate on device', 'Weekly reports', 'Site visit invitation'],
    color: 'border-accent-indigo/40',
  },
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
            <span className="text-pink-400 text-sm font-medium">Support the Mission</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Help Us Care for{' '}
            <span className="gradient-text">Every Cat</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Your contribution directly funds smart feeders, veterinary care, and the technology that makes it all possible.
          </p>
        </div>

        {/* Donation tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map((t) => (
            <GlassCard
              key={t.name}
              className={`p-8 border-2 ${t.color} relative ${t.featured ? 'scale-105' : ''}`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-accent-cyan to-accent-indigo text-white text-xs font-semibold">
                  Most Popular
                </div>
              )}
              <div className="text-3xl mb-4">{t.icon}</div>
              <h3 className="font-display font-bold text-xl mb-1">{t.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display text-4xl font-bold gradient-text">{t.price}</span>
                <span className="text-text-muted text-sm">{t.period}</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-accent-cyan mt-0.5">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
              <Button
                variant={t.featured ? 'primary' : 'secondary'}
                className="w-full justify-center"
                href="#"
              >
                Get Started
              </Button>
            </GlassCard>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-8 text-text-muted text-sm">
          {[
            '🔒 Secure payments',
            '📧 Instant confirmation',
            '❌ Cancel anytime',
            '🏦 Tax-deductible',
          ].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
