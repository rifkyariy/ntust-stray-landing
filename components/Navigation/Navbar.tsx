'use client'

import React, { useState, useEffect } from 'react'
import Button from '../Common/Button'

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Impact', href: '#impact' },
  { label: 'Community', href: '#community' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-indigo flex items-center justify-center text-lg font-bold shadow-lg shadow-accent-cyan/25 group-hover:shadow-accent-cyan/40 transition-shadow">
            🐾
          </div>
          <span className="font-display font-bold text-xl text-text-primary">
            Stray
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-text-secondary hover:text-accent-cyan text-sm font-medium transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" href="#donate">
            Donate
          </Button>
          <Button variant="primary" size="sm" href="/demo">
            Live Demo
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg-secondary/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-text-secondary hover:text-accent-cyan text-sm font-medium transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" size="sm" href="#donate">Donate</Button>
            <Button variant="primary" size="sm" href="#dashboard">Live Demo</Button>
          </div>
        </div>
      )}
    </nav>
  )
}
