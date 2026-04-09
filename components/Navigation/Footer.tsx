import React from 'react'
import Link from 'next/link'
import { PawPrint, MessageCircle, Heart, Globe, GitBranch } from 'lucide-react'

const projectLinks = [
  { label: 'Features',     href: '#features'      },
  { label: 'How It Works', href: '#architecture'  },
  { label: 'Live Demo',    href: '/demo'           },
  { label: 'Device Detail',href: '/demo/F-01'      },
  { label: 'Mobile App',   href: '/mobile'         },
]

const communityLinks = [
  { label: 'Donate Food',  href: '/mobile'              },
  { label: 'Sponsor a Cat',href: '/mobile?screen=sponsor'},
  { label: 'Volunteer',    href: '#donate'              },
  { label: 'Impact',       href: '#impact'              },
]

const socials = [
  { Icon: GitBranch,     label: 'GitHub'  },
  { Icon: Globe,         label: 'Twitter' },
  { Icon: MessageCircle, label: 'Discord' },
]

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-indigo flex items-center justify-center shadow-lg">
                <PawPrint size={17} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl">Stray</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs mb-4">
              An end-to-end IoT platform for stray cat welfare — automated feeding, edge-AI detection, and community fundraising for every campus cat.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-text-muted hover:text-accent-cyan hover:border-accent-cyan/40 transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4 text-sm">Platform</h4>
            <ul className="flex flex-col gap-3">
              {projectLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-text-muted hover:text-accent-cyan text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4 text-sm">Community</h4>
            <ul className="flex flex-col gap-3">
              {communityLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-text-muted hover:text-accent-cyan text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm flex items-center gap-1.5">
            © 2026 Stray Project · Made with <Heart size={12} className="text-pink-400" /> for NTUST Campus Cats
          </p>
          <p className="text-text-muted text-sm">Open Source · MIT License</p>
        </div>
      </div>
    </footer>
  )
}
