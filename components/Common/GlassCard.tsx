import React from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  intensity?: 'light' | 'medium' | 'strong'
  hover?: boolean
  style?: React.CSSProperties
}

export default function GlassCard({
  children,
  className = '',
  intensity = 'medium',
  hover = false,
  style,
}: GlassCardProps) {
  const intensities = {
    light: 'bg-white/[0.03] backdrop-blur-sm border-white/5',
    medium: 'bg-white/[0.05] backdrop-blur-md border-white/10',
    strong: 'bg-white/[0.08] backdrop-blur-xl border-white/15',
  }

  const hoverCls = hover
    ? 'transition-all duration-300 hover:bg-white/[0.08] hover:border-accent-cyan/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-cyan/10'
    : ''

  return (
    <div className={`rounded-2xl border ${intensities[intensity]} ${hoverCls} ${className}`} style={style}>
      {children}
    </div>
  )
}
