'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { PawPrint, Menu, X, LayoutDashboard, Smartphone } from 'lucide-react'
import Button from '../Common/Button'

const navItems = [
  { label: 'Features',     href: '#features' },
  { label: 'How It Works', href: '#architecture' },
  { label: 'Live System',  href: '#dashboard' },
  { label: 'Impact',       href: '#impact' },
  { label: 'Support',      href: '#donate' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-indigo flex items-center justify-center shadow-lg shadow-accent-cyan/25 group-hover:shadow-accent-cyan/40 transition-shadow">
            <PawPrint size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-text-primary">Stray</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}
              className="text-text-secondary hover:text-accent-cyan text-sm font-medium transition-colors duration-200">
              {item.label}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/mobile"
            className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent-cyan transition-colors px-3 py-2">
            <Smartphone size={14} /> Donate
          </Link>
          <Link href="/demo"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-indigo text-white text-sm font-semibold shadow-lg shadow-accent-cyan/20 hover:scale-105 transition-transform">
            <LayoutDashboard size={14} /> Live Demo
          </Link>
        </div>

        {/* Hamburger */}
        <button className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-2"
          onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg-secondary/95 backdrop-blur-xl border-b border-white/10 px-6 py-5 flex flex-col gap-4">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}
              className="text-text-secondary hover:text-accent-cyan text-sm font-medium transition-colors"
              onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2 border-t border-white/10">
            <Link href="/mobile" onClick={() => setMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-white/15 text-sm text-text-secondary hover:text-accent-cyan transition-all">
              <Smartphone size={14} /> Donate
            </Link>
            <Link href="/demo" onClick={() => setMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-indigo text-white text-sm font-semibold">
              <LayoutDashboard size={14} /> Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
