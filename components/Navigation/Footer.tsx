import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-indigo flex items-center justify-center text-lg">
                🐾
              </div>
              <span className="font-display font-bold text-xl">Stray</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Intelligent IoT system for stray cat welfare management. Built with love for the cats of NTUST.
            </p>
            <div className="flex gap-4 mt-6">
              {['GitHub', 'Twitter', 'Discord'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-text-muted hover:text-accent-cyan text-sm transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4 text-sm">Project</h4>
            <ul className="flex flex-col gap-3">
              {['Features', 'Architecture', 'Dashboard', 'API Docs'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-text-muted hover:text-accent-cyan text-sm transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4 text-sm">Community</h4>
            <ul className="flex flex-col gap-3">
              {['About', 'Donate', 'Volunteer', 'Contact'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-text-muted hover:text-accent-cyan text-sm transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © 2026 Stray Project · Made with ❤️ for NTUST Stray Cats 🐾
          </p>
          <p className="text-text-muted text-sm">
            Open Source · MIT License
          </p>
        </div>
      </div>
    </footer>
  )
}
